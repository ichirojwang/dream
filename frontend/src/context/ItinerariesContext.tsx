import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const locations_mock: (LocationType & { itineraryId: number })[] = [
  {
    id: 1,
    name: "Golden Gate Bridge",
    description: "Iconic suspension bridge in San Francisco, offering breathtaking views.",
    coordinates: {
      lat: 37.8199,
      lng: -122.4783,
    },
    itineraryId: 1, // California Adventure
  },
  {
    id: 2,
    name: "Yosemite National Park",
    description: "Famous for giant sequoia trees, waterfalls, and stunning granite cliffs.",
    coordinates: {
      lat: 37.8651,
      lng: -119.5383,
    },
    itineraryId: 4, // Nature and City Escape
  },
  {
    id: 3,
    name: "Santa Monica Pier",
    description: "A popular beachside attraction featuring an amusement park and ocean views.",
    coordinates: {
      lat: 34.0092,
      lng: -118.4973,
    },
    itineraryId: 1, // California Adventure
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
    itineraryId: 1, // California Adventure
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
    itineraryId: 2, // Southwest Wonders
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
    itineraryId: 2, // Southwest Wonders
  },
  {
    id: 7,
    name: "Hollywood Walk of Fame",
    description:
      "A historic sidewalk featuring stars honoring celebrities in the entertainment industry.",
    coordinates: {
      lat: 34.1015,
      lng: -118.3269,
    },
    itineraryId: 3, // West Coast Icons
  },
  {
    id: 8,
    name: "Universal Studios Hollywood",
    description:
      "A world-famous film studio and theme park with thrilling rides and movie attractions.",
    coordinates: {
      lat: 34.1381,
      lng: -118.3534,
    },
    itineraryId: 3, // West Coast Icons
  },
  {
    id: 9,
    name: "Death Valley National Park",
    description:
      "One of the hottest places on Earth, known for its vast desert landscapes and extreme temperatures.",
    coordinates: {
      lat: 36.5323,
      lng: -116.9325,
    },
    itineraryId: 4, // Nature and City Escape
  },
  {
    id: 10,
    name: "Lake Tahoe",
    description:
      "A stunning freshwater lake in the Sierra Nevada, popular for skiing and summer water activities.",
    coordinates: {
      lat: 39.0968,
      lng: -120.0324,
    },
    itineraryId: 4, // Nature and City Escape
  },
  {
    id: 11,
    name: "Sequoia National Park",
    description: "Home to towering giant sequoia trees, including the famous General Sherman Tree.",
    coordinates: {
      lat: 36.4864,
      lng: -118.5658,
    },
    itineraryId: 4, // Nature and City Escape
  },
  {
    id: 12,
    name: "Santa Cruz Beach Boardwalk",
    description: "A classic seaside amusement park with rides, arcades, and oceanfront views.",
    coordinates: {
      lat: 36.9644,
      lng: -122.0176,
    },
    itineraryId: 1, // California Adventure
  },
  {
    id: 13,
    name: "Alcatraz Island",
    description: "A historic island in San Francisco Bay, once home to a notorious federal prison.",
    coordinates: {
      lat: 37.8267,
      lng: -122.423,
    },
    itineraryId: 3, // West Coast Icons
  },
  {
    id: 14,
    name: "Zion National Park",
    description:
      "A breathtaking national park in Utah known for towering sandstone cliffs and scenic hikes.",
    coordinates: {
      lat: 37.2982,
      lng: -113.0263,
    },
    itineraryId: 2, // Southwest Wonders
  },
  {
    id: 15,
    name: "Hoover Dam",
    description:
      "A marvel of modern engineering, providing hydroelectric power and breathtaking views.",
    coordinates: {
      lat: 36.0161,
      lng: -114.7377,
    },
    itineraryId: 2, // Southwest Wonders
  },
];

const itineraries_mock: { id: number; name: string }[] = [
  { id: 1, name: "California Adventure" },
  { id: 2, name: "Southwest Wonders" },
  { id: 3, name: "West Coast Icons" },
  { id: 4, name: "Nature and City Escape" },
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
