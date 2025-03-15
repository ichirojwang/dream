import { useItinerariesContext } from "../../context/ItinerariesContext";
import LinkHome from "../../components/LinkHome";
import { useParams } from "react-router-dom";

const Itinerary = () => {
  const { getItineraryLocations, getItinerary } = useItinerariesContext();

  const { id } = useParams();

  const itinerary = getItinerary(Number(id));
  const locations = getItineraryLocations(Number(id));

  return (
    <div className="flex flex-col">
      <h1>{itinerary?.name}</h1>
      {locations.length === 0 && <span>Your itinerary is empty</span>}
      {locations?.map((location) => {
        return (
          <div key={location.id} className="border">
            <h1>{location.name}</h1>
            <h2>{location.description}</h2>
            <p>
              {location.coordinates.lat}, {location.coordinates.lng}
            </p>
          </div>
        );
      })}
      <LinkHome />
    </div>
  );
};

export default Itinerary;
