import { useState, useEffect } from "react";
import PlantForm from "./PlantForm";
import PlantList from "./PlantList";
import "./App.css";

function App() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlant, setEditingPlant] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch("/plants.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load plants.json");
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setPlants(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      ignore = true; 
    };
  }, []); 


  function addPlant(newPlant) {
    const plantWithId = { ...newPlant, id: Date.now() };
    setPlants([...plants, plantWithId]);
  }


  function updatePlant(updatedPlant) {
    setPlants(
      plants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
    setEditingPlant(null);
  }


  function waterPlant(id) {
    const today = new Date().toLocaleDateString("en-CA"); // gives YYYY-MM-DD
    setPlants(
      plants.map((p) => (p.id === id ? { ...p, lastWatered: today } : p))
    );
  }


  function deletePlant(id) {
    setPlants(plants.filter((p) => p.id !== id));
    if (editingPlant && editingPlant.id === id) {
      setEditingPlant(null);
    }
  }

  return (
    <div className="container">
      <h1>Plant Watering Tracker</h1>

      <PlantForm
        key={editingPlant ? editingPlant.id : "new"}
        editingPlant={editingPlant}
        onAdd={addPlant}
        onUpdate={updatePlant}
        onCancel={() => setEditingPlant(null)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <PlantList
          plants={plants}
          onDelete={deletePlant}
          onEdit={setEditingPlant}
          onWater={waterPlant}
        />
      )}
    </div>
  );
}

export default App;