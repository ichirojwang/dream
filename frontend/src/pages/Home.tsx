import { Link } from "react-router-dom";
import { useItinerariesContext } from "../context/ItinerariesContext";

const Home = () => {
  const { itineraries } = useItinerariesContext();

  return (
    <div className="flex flex-col gap-2">
      {itineraries.map((itinerary) => {
        return (
          <Link key={itinerary.id} to={`/itinerary/${itinerary.id}`}>
            {itinerary.name}
          </Link>
        );
      })}
      <Link className="bg-blue-400 w-fit p-2" to="/itinerary/add">
        Add Itinerary
      </Link>
    </div>
  );
};

export default Home;
