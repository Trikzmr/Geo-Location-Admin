import React, { useEffect, useState, useRef } from "react";
import { API_ENDPOINTS, API_BASE_URL } from "../config";

const Location = () => {
  const [userName, setUserName] = useState("");
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [offSiteList, setOffSiteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  const apiBase = `${API_BASE_URL}/api`;

  const getActiveOffSites = async () => {
    try {
      const res = await fetch(`${apiBase}/getActiveOffSite`);
      if (!res.ok) throw new Error("Unable to fetch active off-site list");
      const data = await res.json();
      setOffSiteList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load active off-site locations");
    }
  };

  useEffect(() => {
    getActiveOffSites();
  }, []);

  const loadMap = () => {
    const apiKey = "AIzaSyD7S5F0Kd8vDcR2NZM28FJ7sO04yh7RkiE";
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${apiKey}"]`);
      if (existingScript) {
        // Script already exists, wait for it to load
        if (window.google && window.google.maps) {
          resolve();
        } else {
          existingScript.addEventListener('load', () => {
            if (window.google && window.google.maps) {
              resolve();
            } else {
              reject(new Error("Google Maps failed to initialize"));
            }
          });
          existingScript.addEventListener('error', (e) => reject(e));
        }
        return;
      }
      // No existing script, load it
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          reject(new Error("Google Maps API loaded but not available"));
        }
      };
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  };

  const updateMap = (coords) => {
    if (!coords || !mapInstanceRef.current) return;

    mapInstanceRef.current.setCenter(coords);
    mapInstanceRef.current.setZoom(15);

    if (markerRef.current) markerRef.current.setMap(null);

    markerRef.current = new window.google.maps.Marker({
      position: coords,
      map: mapInstanceRef.current,
      draggable: false,
      title: "Selected off-site location",
    });

    if (circleRef.current) circleRef.current.setMap(null);

    circleRef.current = new window.google.maps.Circle({
      map: mapInstanceRef.current,
      center: coords,
      radius: 200,
      fillColor: "#34d399",
      fillOpacity: 0.15,
      strokeColor: "#10b981",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
  };

  useEffect(() => {
    loadMap()
      .then(() => {
        const defaultCenter = { lat: 22.5445, lng: 88.3587 };
        if (!mapInstanceRef.current && mapRef.current) {
          console.log("Creating Google Map");
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          });

          mapInstanceRef.current.addListener("click", (e) => {
            const clicked = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            console.log("Map clicked", clicked);
            setSelectedCoord(clicked);
          });
        }
      })
      .then(() => {
        console.log("Google Maps loaded successfully");
      })
      .catch((e) => {
        console.error("Google maps load error", e);
        setError("Failed to load Google Maps.");
      });
  }, []); // Run only once

  useEffect(() => {
    if (selectedCoord && mapInstanceRef.current) {
      updateMap(selectedCoord);
    }
  }, [selectedCoord]);

  const handleAssign = async () => {
    if (!userName.trim()) {
      setError("Enter a username for assignment.");
      return;
    }
    if (!selectedCoord) {
      setError("Please select coordinates on the map first.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Please provide a timeline (start/end date).");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/assignOffSite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim(),
          offSiteLocation: selectedCoord,
          timeline: { startDate, endDate },
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to assign off-site location");
      }

      setSuccess("Off-site location assigned successfully.");
      setStartDate("");
      setEndDate("");
      await getActiveOffSites();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to assign off-site location");
    } finally {
      setLoading(false);
    }
  };

  const showOffSite = (offsite) => {
    if (!offsite?.cordinatates) return;
    const coords = { lat: offsite.cordinatates.lat, lng: offsite.cordinatates.lng };
    setSelectedCoord(coords);
    if (offsite?.assignedTo?.userName) setUserName(offsite.assignedTo.userName);
    setStartDate(offsite.timeLine?.startDate ? offsite.timeLine.startDate.slice(0, 10) : "");
    setEndDate(offsite.timeLine?.endDate ? offsite.timeLine.endDate.slice(0, 10) : "");
    setSuccess("");
    setError("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Off-site Location Management</h1>

      <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
        <div className="xl:col-span-6 space-y-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Add / Edit Off-site Location</h2>

          <div className="flex flex-col space-y-3">
            <label className="font-medium">Employee Username</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="userName"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="font-medium">Latitude</label>
              <input
                value={selectedCoord?.lat ?? ""}
                readOnly
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Longitude</label>
              <input
                value={selectedCoord?.lng ?? ""}
                readOnly
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">Click the map (left) to choose coordinates and 200m radius will be shown.</div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAssign}
              disabled={loading}
              className="bg-[#7152F3] text-white px-4 py-2 rounded hover:bg-[#5d42d4] transition disabled:opacity-50"
            >
              {loading ? "Assigning..." : "Assign Off-site"}
            </button>
            <button
              onClick={() => {
                setUserName("");
                setSelectedCoord(null);
                setStartDate("");
                setEndDate("");
                setError("");
                setSuccess("");
              }}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Clear
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="h-[390px] border border-gray-200 rounded overflow-hidden" ref={mapRef}></div>
        </div>

        <div className="xl:col-span-4 space-y-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Active Off-site Locations</h2>
          {offSiteList.length === 0 ? (
            <p className="text-gray-500">No active off-site locations found.</p>
          ) : (
            <div className="space-y-3 max-h-[840px] overflow-y-auto pr-2">
              {offSiteList.map((offsite) => (
                <button
                  key={offsite._id}
                  onClick={() => showOffSite(offsite)}
                  className="w-full text-left border border-gray-200 rounded-lg p-3 hover:border-indigo-400 hover:bg-indigo-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{offsite.title || "Off-site location"}</div>
                    <div className="text-xs text-gray-500">{offsite.assignedTo?.userName || ''}</div>
                  </div>
                  <div className="text-sm text-gray-600">Lat: {offsite.cordinatates?.lat?.toFixed(6)}, Lng: {offsite.cordinatates?.lng?.toFixed(6)}</div>
                  <div className="text-sm text-gray-600">{offsite.timeLine?.startDate} → {offsite.timeLine?.endDate}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
