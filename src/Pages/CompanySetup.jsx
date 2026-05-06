import React, { useEffect, useRef, useState } from "react";
import { API_ENDPOINTS, API_BASE_URL } from "../config";

const CompanySetup = () => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
    cordinates: { latitude: 22.5726, longitude: 88.3639 },
    zoneCordinates: [],
  });
  const [currentZoneName, setCurrentZoneName] = useState("");
  const [currentSector, setCurrentSector] = useState("");
  const [drawingZone, setDrawingZone] = useState(false);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const companyMarkerRef = useRef(null);
  const companyCircleRef = useRef(null);
  const currentPolylineRef = useRef(null);
  const zonePolygonRefs = useRef([]);
  const zoneLabelRefs = useRef([]);
  const currentPointMarkersRef = useRef([]);
  const drawingZoneRef = useRef(false);

  const apiBase = `${API_BASE_URL}/api`;

  const getRandomColor = () => {
    const colors = ["#6366f1", "#0ea5e9", "#14b8a6", "#f97316", "#ef4444", "#a855f7", "#eab308", "#10b981"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const loadMap = () => {
    const apiKey = "AIzaSyD7S5F0Kd8vDcR2NZM28FJ7sO04yh7RkiE";
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com/maps/api/js?key=${apiKey}"]`
      );

      if (existingScript) {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          existingScript.addEventListener("load", () => {
            if (window.google && window.google.maps) {
              resolve();
            } else {
              reject(new Error("Google Maps failed to initialize"));
            }
          });
          existingScript.addEventListener("error", reject);
        }
        return;
      }

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

  const initMap = () => {
    const center = {
      lat: company.cordinates?.latitude ?? 22.5726,
      lng: company.cordinates?.longitude ?? 88.3639,
    };

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    mapInstanceRef.current.addListener("click", (e) => {
      const clicked = { latitude: e.latLng.lat(), longitude: e.latLng.lng() };

      if (drawingZoneRef.current) {
        setCurrentPoints((prev) => [...prev, clicked]);
      } else {
        setCompany((prev) => ({ ...prev, cordinates: clicked }));
      }
    });
  };

  const renderCompanyMarker = () => {
    if (!mapInstanceRef.current) return;

    const coords = {
      lat: company.cordinates?.latitude ?? 22.5726,
      lng: company.cordinates?.longitude ?? 88.3639,
    };

    mapInstanceRef.current.setCenter(coords);

    if (!companyMarkerRef.current) {
      companyMarkerRef.current = new window.google.maps.Marker({
        position: coords,
        map: mapInstanceRef.current,
        draggable: true,
        title: "Company Location",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#7c3aed",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#fff",
        },
      });

      companyMarkerRef.current.addListener("dragend", (e) => {
        setCompany((prev) => ({
          ...prev,
          cordinates: { latitude: e.latLng.lat(), longitude: e.latLng.lng() },
        }));
      });
    } else {
      companyMarkerRef.current.setPosition(coords);
    }
  };

  const clearZonePolygons = () => {
    zonePolygonRefs.current.forEach((poly) => poly.setMap(null));
    zonePolygonRefs.current = [];
  };

  const clearZoneLabels = () => {
    zoneLabelRefs.current.forEach((label) => label.setMap(null));
    zoneLabelRefs.current = [];
  };

  const clearCurrentPointMarkers = () => {
    currentPointMarkersRef.current.forEach((m) => m.setMap(null));
    currentPointMarkersRef.current = [];
  };

  const renderCurrentPointMarkers = () => {
    if (!mapInstanceRef.current) return;
    clearCurrentPointMarkers();

    currentPoints.forEach((point) => {
      const marker = new window.google.maps.Marker({
        position: { lat: point.latitude, lng: point.longitude },
        map: mapInstanceRef.current,
        clickable: false,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: "#f59e0b",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#ffffff",
        },
      });
      currentPointMarkersRef.current.push(marker);
    });
  };

  const renderZonePolygons = () => {
    if (!mapInstanceRef.current || !company.zoneCordinates) return;
    clearZonePolygons();
    clearZoneLabels();

    const colors = ["#6366f1", "#0ea5e9", "#14b8a6", "#f97316", "#ef4444", "#a855f7"];

    company.zoneCordinates.forEach((zone, idx) => {
      if (!zone.cordinateList?.length) return;
      const path = zone.cordinateList.map((p) => ({ lat: p.latitude, lng: p.longitude }));
      const color = zone.color || colors[idx % colors.length] || getRandomColor();

      const polygon = new window.google.maps.Polygon({
        paths: path,
        fillColor: color,
        fillOpacity: 0.25,
        strokeColor: color,
        strokeWeight: 2,
      });

      polygon.setMap(mapInstanceRef.current);
      zonePolygonRefs.current.push(polygon);

      // Calculate centroid for label
      const centroid = path.reduce(
        (acc, point) => ({
          lat: acc.lat + point.lat / path.length,
          lng: acc.lng + point.lng / path.length,
        }),
        { lat: 0, lng: 0 }
      );

      // Add label marker
      const labelMarker = new window.google.maps.Marker({
        position: centroid,
        map: mapInstanceRef.current,
        label: {
          text: zone.ZoneName,
          color: '#000000',
          fontSize: '10px',
          fontWeight: 'bold',
        },
        icon: {
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          size: new window.google.maps.Size(1, 1),
          anchor: new window.google.maps.Point(0, 0),
        },
        clickable: false,
      });

      zoneLabelRefs.current.push(labelMarker);
    });
  };

  const renderCurrentPolyline = () => {
    if (!mapInstanceRef.current) return;

    if (currentPolylineRef.current) {
      currentPolylineRef.current.setMap(null);
      currentPolylineRef.current = null;
    }

    if (currentPoints.length > 0) {
      const path = currentPoints.map((p) => ({ lat: p.latitude, lng: p.longitude }));

      if (currentPoints.length >= 3) {
        // Show polygon preview when 3+ points
        currentPolylineRef.current = new window.google.maps.Polygon({
          paths: path,
          fillColor: "#f59e0b",
          fillOpacity: 0.2,
          strokeColor: "#f59e0b",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
      } else {
        // Show polyline for 1-2 points
        currentPolylineRef.current = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#f59e0b",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
      }

      currentPolylineRef.current.setMap(mapInstanceRef.current);
    }
  };

  useEffect(() => {
    loadMap()
      .then(() => {
        if (mapRef.current && !mapInstanceRef.current) {
          initMap();
        }
      })
      .catch((e) => {
        console.error("Google maps load error", e);
        setError("Failed to load Google Maps.");
      });
  }, []);

  useEffect(() => {
    drawingZoneRef.current = drawingZone;
  }, [drawingZone]);

  const renderCompanyCircle = () => {
    if (!mapInstanceRef.current) return;

    const position = {
      lat: company.cordinates?.latitude ?? 22.5726,
      lng: company.cordinates?.longitude ?? 88.3639,
    };

    if (!companyCircleRef.current) {
      companyCircleRef.current = new window.google.maps.Circle({
        map: mapInstanceRef.current,
        center: position,
        radius: 500,
        fillColor: "#34d399",
        fillOpacity: 0.15,
        strokeColor: "#10b981",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: false,
        zIndex: 1,
      });
    } else {
      companyCircleRef.current.setCenter(position);
      companyCircleRef.current.setRadius(500);
    }
  };

  useEffect(() => {
    if (mapInstanceRef.current) {
      renderCompanyMarker();
      renderCompanyCircle();
      renderZonePolygons();
      renderCurrentPolyline();
      renderCurrentPointMarkers();
    }
  }, [company.cordinates, company.zoneCordinates]);

  useEffect(() => {
    renderCurrentPolyline();
    renderCurrentPointMarkers();
  }, [currentPoints]);

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${apiBase}/company`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load company data");
        }

        if (data.data) {
          setCompany({
            name: data.data.name || "",
            address: data.data.address || "",
            contactNumber: data.data.contactNumber || "",
            email: data.data.email || "",
            cordinates: {
              latitude: data.data.cordinates?.latitude ?? 22.5726,
              longitude: data.data.cordinates?.longitude ?? 88.3639,
            },
            zoneCordinates: Array.isArray(data.data.zoneCordinates) ? data.data.zoneCordinates : [],
          });
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const startNewZone = () => {
    setDrawingZone(true);
    setCurrentPoints([]);
    setError("");
    setSuccess("Click on the map to add zone points.");
  };

  const cancelZone = () => {
    setDrawingZone(false);
    setCurrentPoints([]);
    setCurrentZoneName("");
    setCurrentSector("");
    setError("");
    setSuccess("");
  };

  const addZone = () => {
    if (currentPoints.length < 3) {
      setError("Please mark at least 3 points on the map to complete a zone.");
      return;
    }
    if (!currentZoneName.trim() || !currentSector.trim()) {
      setError("Please enter zone name and sector.");
      return;
    }

    const newZone = {
      ZoneName: currentZoneName.trim(),
      Sector: currentSector.trim(),
      cordinateList: currentPoints.map((p) => ({ latitude: p.latitude, longitude: p.longitude })),
      color: getRandomColor(),
    };

    setCompany((prev) => ({
      ...prev,
      zoneCordinates: [...prev.zoneCordinates, newZone],
    }));

    setDrawingZone(false);
    setCurrentPoints([]);
    setCurrentZoneName("");
    setCurrentSector("");
    setSuccess("Zone added successfully.");
    setError("");
  };

  const deleteZone = (index) => {
    setCompany((prev) => ({
      ...prev,
      zoneCordinates: prev.zoneCordinates.filter((_, i) => i !== index),
    }));
    setSuccess("Zone deleted.");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!company.name.trim()) {
      setError("Company name is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBase}/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Server error");
      }

      setSuccess(data.message || "Company details saved successfully.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Setup & Geo-Fencing</h1>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 space-y-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Company Details</h2>

          {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
          {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                placeholder="ABC Pvt Ltd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                value={company.address}
                onChange={(e) => setCompany((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                placeholder="Kolkata, India"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">Contact Number</label>
                <input
                  type="tel"
                  value={company.contactNumber}
                  onChange={(e) => setCompany((prev) => ({ ...prev, contactNumber: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  placeholder="9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={company.email}
                  onChange={(e) => setCompany((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  placeholder="abc@gmail.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="block text-sm font-medium">Latitude</label>
                <input
                  type="number"
                  value={company.cordinates.latitude ?? ""}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Longitude</label>
                <input
                  type="number"
                  value={company.cordinates.longitude ?? ""}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
            >
              {loading ? "Saving..." : "Save Company"}
            </button>
          </form>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold">Zone Drawing</h3>
            <p className="text-sm text-gray-500">Click map to set company location; toggle mode to draw zones.</p>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={startNewZone}
                disabled={drawingZone}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
              >
                Start New Zone
              </button>
              <button
                onClick={cancelZone}
                disabled={!drawingZone}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
            </div>

            {drawingZone && (
              <div className="space-y-3 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={currentZoneName}
                    onChange={(e) => setCurrentZoneName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Zone Name"
                  />
                  <input
                    type="text"
                    value={currentSector}
                    onChange={(e) => setCurrentSector(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Sector"
                  />
                </div>

                <div className="text-xs text-gray-600">
                  Points: {currentPoints.length}. Click on map to add. At least 3 points are required.
                </div>
                <button
                  onClick={addZone}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-60"
                >
                  Add Zone
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Zone List</h3>
            {company.zoneCordinates.length === 0 ? (
              <p className="text-sm text-gray-500">No zones created yet.</p>
            ) : (
              <div className="space-y-2 mt-2 max-h-64 overflow-auto">
                {company.zoneCordinates.map((zone, i) => (
                  <div key={`zone-${i}`} className="border p-2 rounded bg-gray-50">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: zone.color || "#6366f1" }}
                        />
                        <div>
                          <div className="font-semibold">{zone.ZoneName}</div>
                          <div className="text-xs text-gray-600">Sector: {zone.Sector}</div>
                          <div className="text-xs text-gray-600">Points: {zone.cordinateList?.length ?? 0}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteZone(i)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-7 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Interactive Map</h2>
          <div className="h-[500px] rounded-lg border border-gray-300" ref={mapRef} />
          <div className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Instructions:</span> Click map to position company marker (default mode) or add zone points (when zone drawing mode is active).
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
