import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
const locations_mock: (LocationType & { itineraryId: number })[] = [
  {
    id: 1,
    name: "Golden Gate Bridge",
    description: "Iconic suspension bridge in San Francisco, offering breathtaking views.",
    coordinates: { lat: 37.8199, lng: -122.4783 },
    itineraryId: 1, // California Adventure
  },
  {
    id: 2,
    name: "Santa Monica Pier",
    description: "A popular beachside attraction featuring an amusement park and ocean views.",
    coordinates: { lat: 34.0092, lng: -118.4973 },
    itineraryId: 1, // California Adventure
  },
  {
    id: 3,
    name: "Venice Beach",
    description:
      "A vibrant beachfront neighborhood known for its boardwalk, street performers, and skate park.",
    coordinates: { lat: 33.985, lng: -118.4695 },
    itineraryId: 1, // California Adventure
  },
  {
    id: 4,
    name: "Grand Canyon National Park",
    description:
      "One of the world's most breathtaking natural wonders, featuring vast canyon landscapes.",
    coordinates: { lat: 36.1069, lng: -112.1129 },
    itineraryId: 2, // Southwest Wonders
  },
  {
    id: 5,
    name: "Las Vegas Strip",
    description:
      "A famous stretch of Las Vegas Boulevard known for its vibrant nightlife, casinos, and entertainment.",
    coordinates: { lat: 36.1147, lng: -115.1728 },
    itineraryId: 2, // Southwest Wonders
  },
  {
    id: 6,
    name: "Zion National Park",
    description:
      "A breathtaking national park in Utah known for towering sandstone cliffs and scenic hikes.",
    coordinates: { lat: 37.2982, lng: -113.0263 },
    itineraryId: 2, // Southwest Wonders
  },
  {
    id: 7,
    name: "Hoover Dam",
    description:
      "A marvel of modern engineering, providing hydroelectric power and breathtaking views.",
    coordinates: { lat: 36.0161, lng: -114.7377 },
    itineraryId: 2, // Southwest Wonders
  },
  // Canada Locations
  {
    id: 8,
    name: "Niagara Falls",
    description:
      "A world-famous waterfall on the Canada-US border, offering breathtaking views and boat tours.",
    coordinates: { lat: 43.0828, lng: -79.0742 },
    itineraryId: 3, // Canada Trip
  },
  {
    id: 9,
    name: "Banff National Park",
    description:
      "A stunning national park in the Canadian Rockies, known for its crystal-clear lakes and scenic hikes.",
    coordinates: { lat: 51.4968, lng: -115.9281 },
    itineraryId: 3, // Canada Trip
  },
  {
    id: 10,
    name: "Vancouver",
    description:
      "A vibrant coastal city in British Columbia, known for its stunning waterfront, mountains, and diverse culture.",
    coordinates: { lat: 49.2827, lng: -123.1207 },
    itineraryId: 3, // Canada Trip
  },
  {
    id: 11,
    name: "Old Quebec",
    description:
      "A charming historic district with cobblestone streets, French architecture, and rich cultural heritage.",
    coordinates: { lat: 46.8139, lng: -71.2082 },
    itineraryId: 3, // Canada Trip
  },
];

const itineraries_mock: { id: number; name: string }[] = [
  { id: 1, name: "California Adventure" },
  { id: 2, name: "Southwest Wonders" },
  { id: 3, name: "Canada Trip" },
];

interface ItinerariesContextProps {
  itineraries: ItineraryType[];
  setSelectedItineraryById: (id: number) => void;
  getItinerary: (id: number) => ItineraryType | undefined;
  getItineraryLocations: (id: number) => LocationType[];
  addItinerary: (name: string) => void;
  selectedItinerary: ItineraryType | null;
  addLocation: (name: string, desc: string, coords: google.maps.LatLngLiteral) => void;
  deleteLocation: (id: number) => void;
  // locations: LocationType[] | null;
  selectedCoords: google.maps.LatLngLiteral | null;
  setSelectedCoords: Dispatch<SetStateAction<google.maps.LatLngLiteral | null>>;
}

const ItinerariesContext = createContext<ItinerariesContextProps | undefined>(undefined);

const ItinerariesProvider = ({ children }: { children: ReactNode }) => {
  const [itineraries, setItineraries] = useState<ItineraryType[]>(itineraries_mock);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryType | null>(null);
  const [locations, setLocations] =
    useState<(LocationType & { itineraryId: number })[]>(locations_mock);
  const [selectedCoords, setSelectedCoords] = useState<google.maps.LatLngLiteral | null>(null);

  const setSelectedItineraryById = (id: number) => {
    const itinerary = itineraries.find((itinerary) => itinerary.id === id);
    if (itinerary) {
      setSelectedItinerary(itinerary);
    }
  };

  const getItinerary = (id: number) => {
    const itinerary = itineraries.find((itinerary) => itinerary.id === id);
    if (itinerary) {
      setSelectedItinerary(itinerary);
      return itinerary;
    }

    return undefined;
  };

  const getItineraryLocations = (id: number) => {
    const itinerary = itineraries.find((itinerary) => itinerary.id === id);
    if (itinerary) {
      setSelectedItinerary(itinerary);
      const itineraryLocations = locations.filter(
        (location) => location.itineraryId === selectedItinerary?.id
      );
      return itineraryLocations;
    }
    return [];
  };

  const addItinerary = (name: string) => {
    const newItinerary = { id: Number(((Math.random() * 1000) / 5).toFixed(0)), name };
    setItineraries((itins) => [...itins, newItinerary]);
  };

  const addLocation = (
    name: string,
    description: string,
    coordinates: google.maps.LatLngLiteral
  ) => {
    if (!selectedItinerary) return;
    const newLocation: LocationType = { id: Math.random(), name, description, coordinates };
    const locationWithItinId = { ...newLocation, itineraryId: selectedItinerary.id };
    setLocations((oldLocations) => [...oldLocations, locationWithItinId]);
  };

  const deleteLocation = (id: number) => {
    if (!selectedItinerary) return;
    setLocations((oldLocations) => oldLocations.filter((location) => location.id !== id));
  };

  return (
    <ItinerariesContext.Provider
      value={{
        itineraries,
        setSelectedItineraryById,
        getItinerary,
        addItinerary,
        selectedItinerary,
        addLocation,
        deleteLocation,
        // locations,
        getItineraryLocations,
        selectedCoords,
        setSelectedCoords,
      }}
    >
      {children}
    </ItinerariesContext.Provider>
  );
};

export const useItinerariesContext = () => {
  const context = useContext(ItinerariesContext);
  if (!context) throw new Error("Itineraries Context used outside Provider");

  return context;
};

export default ItinerariesProvider;
