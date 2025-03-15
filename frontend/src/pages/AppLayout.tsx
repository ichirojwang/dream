import Sidebar from "../components/Sidebar";
import Map from "../features/map/Map";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4">
        <Sidebar />
      </div>
      <div className="col-span-8">
        <Map />
      </div>
    </div>
  );
};

export default AppLayout;
