import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

/* 
  this component is for rendering lines between points on the map
*/

interface Props {
  path: google.maps.LatLngLiteral[];
}

const MapPolyline = ({ path }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map || path.length === 0) return;

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#0077ff",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(map);

    return () => polyline.setMap(null);
  }, [map, path]);

  return null;
};

export default MapPolyline;
