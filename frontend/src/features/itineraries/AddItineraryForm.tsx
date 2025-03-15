import { FormEvent, useState } from "react";
import { useItinerariesContext } from "../../context/ItinerariesContext";
import Button from "../../components/Button";
import LinkHome from "../../components/LinkHome";
import { useNavigate } from "react-router-dom";

const AddItineraryForm = () => {
  const [name, setName] = useState<string>("");
  const { addItinerary } = useItinerariesContext();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    console.log("add itin");
    addItinerary(name);
    setName("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        className="border-black border"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Add</Button>
      <LinkHome />
    </form>
  );
};

export default AddItineraryForm;
