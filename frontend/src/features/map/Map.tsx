import "@vis.gl/react-google-maps"
import { APIProvider } from "@vis.gl/react-google-maps";

const locations: LocationType[] = [
  {
    id: 1,
    name: "Golden Gate Bridge",
    description: "Iconic suspension bridge in San Francisco, offering breathtaking views.",
    coordinates: {
      lat: 37.8199,
      lng: -122.4783,
    },
  },
  {
    id: 2,
    name: "Yosemite National Park",
    description: "Famous for giant sequoia trees, waterfalls, and stunning granite cliffs.",
    coordinates: {
      lat: 37.8651,
      lng: -119.5383,
    },
  },
  {
    id: 3,
    name: "Santa Monica Pier",
    description: "A popular beachside attraction featuring an amusement park and ocean views.",
    coordinates: {
      lat: 34.0092,
      lng: -118.4973,
    },
  },
  {
    id: 4,
    name: "Grand Canyon National Park",
    description:
      "One of the world's most breathtaking natural wonders, featuring vast canyon landscapes.",
    coordinates: {
      lat: 36.1069,
      lng: -112.1129,
    },
  },
  {
    id: 5,
    name: "Las Vegas Strip",
    description:
      "A famous stretch of Las Vegas Boulevard known for its vibrant nightlife, casinos, and entertainment.",
    coordinates: {
      lat: 36.1147,
      lng: -115.1728,
    },
  },
];

const Map = () => {
  return <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}></APIProvider>
};

export default Map;
