import Button from "../../components/Button";
import { useLocationsContext } from "../../context/LocationsContext";
import { FormEvent, useState } from "react";

const AddLocationForm = () => {
  const { selectedLocation, addLocation, setSelectedLocation } = useLocationsContext();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return;
    if (!selectedLocation) return;

    const newLocation = {
      id: Math.random(),
      name,
      description,
      coordinates: selectedLocation,
    };

    addLocation(newLocation);

    setName("");
    setDescription("");
    setSelectedLocation(null);
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

      {selectedLocation && (
        <Button type="submit" className="absolute bottom-4 left-4 ">
          Add
        </Button>
      )}
    </form>
  );
};

export default AddLocationForm;
