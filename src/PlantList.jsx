
function daysSince(dateString) {
  const then = new Date(dateString + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((today - then) / (1000 * 60 * 60 * 24));
}

function PlantList({ plants, onDelete, onEdit, onWater }) {
  if (plants.length === 0) {
    return <p>No plants yet. Add one above.</p>;
  }

  return (
    <div className="plant-grid">
      {plants.map((plant) => {
        const days = daysSince(plant.lastWatered);
        const thirsty = days >= plant.wateringEveryDays;

        return (
          <div
            key={plant.id}
            className={thirsty ? "card thirsty" : "card"}
          >
            <h3>{plant.name}</h3>
            <p>Location: {plant.location}</p>
            <p>Water every {plant.wateringEveryDays} days</p>
            <p>Last watered: {plant.lastWatered} ({days} days ago)</p>
            <p className="status">
              {thirsty ? "Needs water!" : "Happy and hydrated"}
            </p>

            <button onClick={() => onWater(plant.id)}>Water Today</button>
            <button onClick={() => onEdit(plant)}>Edit</button>
            <button onClick={() => onDelete(plant.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default PlantList;