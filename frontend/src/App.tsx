import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import ItinerariesProvider from "./context/ItinerariesContext";
import AddItineraryForm from "./features/itineraries/AddItineraryForm";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Itinerary from "./features/itineraries/Itinerary";

function App() {
  return (
    <ItinerariesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/itinerary/add" element={<AddItineraryForm />} />
            <Route path="/itinerary/:id" element={<Itinerary />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ItinerariesProvider>
  );
}

export default App;
