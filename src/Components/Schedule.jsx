import React from "react";
import { Calendar } from "lucide-react";

const Schedule = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-sm">

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">My Schedule</h2>
        <Calendar className="text-purple-500" size={20} />
      </div>


      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <button className="text-purple-500 text-lg">{"<"}</button>
          <span className="font-medium">July, 2023</span>
          <button className="text-purple-500 text-lg">{">"}</button>
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-gray-400">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="grid grid-cols-7 text-center mt-1 text-sm">
          {/* Empty spaces */}
          <div></div>
          <div></div>
          <div></div>
          <div className="text-gray-500">1</div>
          <div className="text-gray-500">2</div>
          <div className="text-gray-500">3</div>
          <div className="text-gray-500">4</div>
          <div className="text-gray-500">5</div>
          <div className="flex justify-center">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white">
              6
            </span>
          </div>
          <div className="text-gray-500">7</div>
          <div className="text-gray-500">8</div>
          <div className="text-gray-500">9</div>
          <div className="text-gray-500">10</div>
          <div className="text-gray-500">11</div>
          <div className="text-gray-500">12</div>
          <div className="text-gray-500">13</div>
          <div className="text-gray-500">14</div>
          <div className="text-gray-500">15</div>
          <div className="text-gray-500">16</div>
          <div className="text-gray-500">17</div>
          <div className="text-gray-500">18</div>
          <div className="text-gray-500">19</div>
          <div className="text-gray-500">20</div>
          <div className="text-gray-500">21</div>
          <div className="text-gray-500">22</div>
          <div className="text-gray-500">23</div>
          <div className="text-gray-500">24</div>
          <div className="text-gray-500">25</div>
          <div className="text-gray-500">26</div>
          <div className="text-gray-500">27</div>
          <div className="text-gray-500">28</div>
          <div className="text-gray-500">29</div>
          <div className="text-gray-500">30</div>
          <div className="text-gray-500">31</div>
          
        </div>
      </div>

      {/* Events */}
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-gray-500 mb-1">Wednesday, 06 July 2023</h4>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium w-12">09:30</span>
              <div>
                <div className="font-medium">UI/UX Designer</div>
                <div className="text-gray-500">Practical Task Review</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium w-12">12:00</span>
              <div>
                <div className="font-medium">Magento Developer</div>
                <div className="text-gray-500">Resume Review</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium w-12">01:30</span>
              <div>
                <div className="font-medium">Sales Manager</div>
                <div className="text-gray-500">Final HR Round</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-500 mb-1">Thursday, 07 July 2023</h4>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium w-12">09:50</span>
              <div>
                <div className="font-medium">Front end Developer</div>
                <div className="text-gray-500">Practical Task Review</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium w-12">11:00</span>
              <div>
                <div className="font-medium">React JS</div>
                <div className="text-gray-500">TL Meeting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
