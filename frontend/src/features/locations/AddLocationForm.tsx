import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useItinerariesContext } from "../../context/ItinerariesContext";
import { FormEvent, useState } from "react";

const AddLocationForm = () => {
  const navigate = useNavigate();
  const { addLocation, selectedCoords, setSelectedCoords } = useItinerariesContext();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { id } = useParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return;
    if (!selectedCoords) return;

    addLocation(name, description, selectedCoords);

    setName("");
    setDescription("");
    setSelectedCoords(null);
    if (id) {
      navigate(`/itinerary/${id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        className="border-black border"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="desc">Description (Optional)</label>
      <input
        id="desc"
        className="border-black border"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {selectedCoords && (
        <Button type="submit" className="absolute bottom-4 left-4 ">
          Add
        </Button>
      )}
      <Link to={`/itinerary/${id}`}>Back</Link>
    </form>
  );
};

export default AddLocationForm;
