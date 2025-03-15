import { AdvancedMarker, APIProvider, Map, MapMouseEvent, Pin } from "@vis.gl/react-google-maps";
import Markers from "./Markers";
import MapPolyline from "./MapPolyline";
import { useCallback } from "react";
import { useItinerariesContext } from "../../context/ItinerariesContext";
import { useParams } from "react-router-dom";

const MapDisplay = () => {
  const { id } = useParams();
  const { getItineraryLocations } = useItinerariesContext();

  const locations = getItineraryLocations(Number(id));
  /* 
  const handleClick = useCallback(
    (event: MapMouseEvent) => {
      console.log(event);
      setSelectedLocation(event.detail.latLng);
    },
    [setSelectedLocation]
  ); */

  return (
    <div className="relative w-full h-full">
      <APIProvider
        apiKey={import.meta.env.VITE_MAP_API_KEY}
        onLoad={() => console.log("Maps API has loaded")}
      >
        <Map
          defaultZoom={6}
          defaultCenter={{ lat: 36.59740854796758, lng: -117.02889432149375 }}
          mapId={import.meta.env.VITE_MAP_ID}
          // onCameraChanged={(ev: MapCameraChangedEvent) =>console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)}
          onClick={() => {}}
        >
          {locations && (
            <>
              <Markers locations={locations} />
              <MapPolyline path={locations.map((location) => location.coordinates)} />
              {/*               {selectedLocation && (
                <AdvancedMarker position={selectedLocation}>
                  <Pin />
                </AdvancedMarker>
              )} */}
            </>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapDisplay;
