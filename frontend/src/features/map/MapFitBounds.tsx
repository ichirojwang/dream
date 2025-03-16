import { useMap } from "@vis.gl/react-google-maps";

interface Props {
  locations: google.maps.LatLngLiteral[];
}

const MapFitBounds = ({ locations }: Props) => {
  const map = useMap();

  let boundsLocations = locations;
  if (locations.length === 0) {
    boundsLocations = [
      { lat: 49.42652203027076, lng: -123.5059243052276 },
      { lat: 48.98135084242044, lng: -122.44180198950492 },
    ];
  }

  const bounds = new google.maps.LatLngBounds();

  for (let i = 0; i < boundsLocations.length; i++) {
    bounds.extend(boundsLocations[i]);
  }

  map?.fitBounds(bounds);

  return null;
};

export default MapFitBounds;
