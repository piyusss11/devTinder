import  { useState } from 'react';
import MainNavBar from '../components/MainNavBar';
import Connections from '../components/Connections';
import Requests from '../components/Requests';


const TogglePage = () => {
  // State to track which view is selected
  const [selectedView, setSelectedView] = useState<'connections' | 'requests'>('connections');

  return (
    <div className='min-h-screen bg-[#3A3A3F]'>
      {/* Main NavBar */}
      <MainNavBar />

      {/* Toggle Switch in the center */}
      <div className="flex justify-center mt-10 ">
        <div className=" p-2 rounded-lg shadow-md inline-flex">
          <button
            className={`px-4 py-2 rounded-l-lg ${selectedView === 'connections' ? 'bg-[#F58F7C] text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedView('connections')}
          >
            Connections
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${selectedView === 'requests' ? 'bg-[#F58F7C] text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedView('requests')}
          >
            Requests
          </button>
        </div>
      </div>

      {/* Conditionally render the selected view */}
      <div className="mt-10 flex justify-center">
        {selectedView === 'connections' ? <Connections /> : <Requests />}
      </div>
    </div>
  );
};

export default TogglePage;
