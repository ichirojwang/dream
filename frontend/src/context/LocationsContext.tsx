import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const locations_mock: LocationType[] = [
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
    name: "Venice Beach",
    description:
      "A vibrant beachfront neighborhood known for its boardwalk, street performers, and skate park.",
    coordinates: {
      lat: 33.985,
      lng: -118.4695,
    },
  },
  {
    id: 5,
    name: "Grand Canyon National Park",
    description:
      "One of the world's most breathtaking natural wonders, featuring vast canyon landscapes.",
    coordinates: {
      lat: 36.1069,
      lng: -112.1129,
    },
  },
  {
    id: 6,
    name: "Las Vegas Strip",
    description:
      "A famous stretch of Las Vegas Boulevard known for its vibrant nightlife, casinos, and entertainment.",
    coordinates: {
      lat: 36.1147,
      lng: -115.1728,
    },
  },
];

const itineraries_mock: { id: number; name: string; locations: LocationType[] }[] = [
  {
    id: 1,
    name: "California Adventure",
    locations: [
      locations_mock[0], // Golden Gate Bridge
      locations_mock[1], // Yosemite National Park
      locations_mock[2], // Santa Monica Pier
      locations_mock[3], // Venice Beach
    ],
  },
  {
    id: 2,
    name: "Southwest Wonders",
    locations: [
      locations_mock[4], // Grand Canyon National Park
      locations_mock[5], // Las Vegas Strip
    ],
  },
  {
    id: 3,
    name: "West Coast Icons",
    locations: [
      locations_mock[0], // Golden Gate Bridge
      locations_mock[2], // Santa Monica Pier
      locations_mock[3], // Venice Beach
    ],
  },
  {
    id: 4,
    name: "Nature and City Escape",
    locations: [
      locations_mock[1], // Yosemite National Park
      locations_mock[4], // Grand Canyon National Park
      locations_mock[5], // Las Vegas Strip
    ],
  },
];

interface LocationsContextProps {
  locations: LocationType[];
  addLocation: (location: LocationType) => void;
  deleteLocation: () => void;
  selectedLocation: google.maps.LatLngLiteral | null;
  setSelectedLocation: Dispatch<SetStateAction<google.maps.LatLngLiteral | null>>;
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
}

const defaultContext: LocationsContextProps = {
  locations: [],
  addLocation: () => {},
  deleteLocation: () => {},
  selectedLocation: null,
  setSelectedLocation: () => {},
  selectedId: null,
  setSelectedId: () => {},
};

const LocationsContext = createContext<LocationsContextProps>(defaultContext);

interface LocationsProviderProps {
  children: ReactNode;
}

const LocationsProvider = ({ children }: LocationsProviderProps) => {
  const [itineraries, setItineraries] = useState<ItineraryType[]>(itineraries_mock);
  const [selectedItinerary, setSelectedItinerary] = useState(itineraries_mock[0]);

  const [locations, setLocations] = useState<LocationType[]>(selectedItinerary.locations);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addLocation = (newLocation: LocationType) => {
    setLocations((oldLocations) => [...oldLocations, newLocation]);
  };

  const deleteLocation = () => {
    if (!selectedId) return;
    setLocations((oldLocations) => oldLocations.filter((location) => location.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <LocationsContext.Provider
      value={{
        locations,
        selectedLocation,
        addLocation,
        deleteLocation,
        setSelectedLocation,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);
  if (!context) throw new Error("Locations Context used outside Provider");
  return context;
};

export default LocationsProvider;
