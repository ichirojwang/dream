type ItineraryType = {
  id: number;
  name: string;
};

type LocationType = {
  id: number;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
};
