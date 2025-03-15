import { useItinerariesContext } from "../../context/ItinerariesContext";
import LinkHome from "../../components/LinkHome";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";

const Itinerary = () => {
  const { getItineraryLocations, getItinerary, deleteLocation } = useItinerariesContext();

  const { id } = useParams();

  const itinerary = getItinerary(Number(id));
  const locations = getItineraryLocations(Number(id));

  return (
    <>
      <h1>{itinerary?.name}</h1>
      <div className="flex flex-col overflow-scroll max-h-[80vh]">
        {locations.length === 0 && <span>Your itinerary is empty</span>}
        {locations?.map((location) => {
          return (
            <div key={location.id} className="border">
              <h1>{location.name}</h1>
              <h2>{location.description}</h2>
              <p>
                {location.coordinates.lat}, {location.coordinates.lng}
              </p>
              <Button onClick={() => deleteLocation(location.id)}>Delete</Button>
            </div>
          );
        })}
      </div>
      <LinkHome />
    </>
  );
};

export default Itinerary;
