import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocationsContext } from "../../context/LocationsContext";
import Button from "../../components/Button";

interface Props {
  locations: LocationType[];
}

const Markers = ({ locations }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  const { selectedId, setSelectedId, deleteLocation } = useLocationsContext();

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent, id: number) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("marker clicked", ev.latLng.toString());
      map.panTo(ev.latLng);
      setSelectedId(id);
    },
    [map, setSelectedId]
  );

  const handleDelete = useCallback(() => {
    deleteLocation();
  }, [deleteLocation]);

  return (
    <>
      {locations.map((location) => {
        return (
          <AdvancedMarker
            key={location.id}
            position={location.coordinates}
            ref={(marker) => setMarkerRef(marker, String(location.id))}
            onClick={(ev) => handleClick(ev, location.id)}
          >
            <Pin background="blue" borderColor="darkblue" glyphColor="lightblue" />
          </AdvancedMarker>
        );
      })}
      {selectedId && (
        <Button onClick={handleDelete} className="absolute bottom-4 left-4">
          Delete
        </Button>
      )}
    </>
  );
};

export default Markers;
