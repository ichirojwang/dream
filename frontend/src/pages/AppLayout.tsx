import Sidebar from "../components/Sidebar";
import MapDisplay from "../features/map/MapDisplay";


const AppLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen p-2 gap-2">
      <div className="col-span-4 p-2">
        <Sidebar />
      </div>
      <div className="col-span-8 h-full">
        <MapDisplay  />
      </div>
    </div>
  );
};

export default AppLayout;
