import { useState } from "react";

const emptyForm = {
  name: "",
  location: "",
  wateringEveryDays: "",
  lastWatered: "",
};

function PlantForm({ editingPlant, onAdd, onUpdate, onCancel }) {
  // If we're editing, start with that plant's data. Otherwise start empty.
  const [form, setForm] = useState(editingPlant || emptyForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading

    const days = Number(form.wateringEveryDays);

    if (!form.name || !form.location || !form.lastWatered) {
      alert("Please fill in all fields.");
      return;
    }
    if (!days || days < 1) {
      alert("Watering interval must be at least 1 day.");
      return;
    }

    // Inputs give us text, so convert the interval to a real number
    const cleanPlant = { ...form, wateringEveryDays: days };

    if (editingPlant) {
      onUpdate(cleanPlant);
    } else {
      onAdd(cleanPlant);
      setForm(emptyForm); // clear the form after adding
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingPlant ? "Edit Plant" : "Add a Plant"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location (e.g. Kitchen)"
        value={form.location}
        onChange={handleChange}
      />
      <input
        type="number"
        name="wateringEveryDays"
        placeholder="Water every ___ days"
        min="1"
        value={form.wateringEveryDays}
        onChange={handleChange}
      />
      <input
        type="date"
        name="lastWatered"
        value={form.lastWatered}
        onChange={handleChange}
      />

      <button type="submit">
        {editingPlant ? "Save Changes" : "Add Plant"}
      </button>
      {editingPlant && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default PlantForm;