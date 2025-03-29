import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { deleteItem, updateItem } from "../utils/api"; // Импорт на функцията за актуализация
import { addToFavourites } from "../components/Favourites/favouritesService";
import "../Styles/Planets.css";

const PlanetModal = ({ planet, onClose, onDelete }) => {
  const { user } = useAuth();
  const isAuthor = user && user.uid === planet.createdBy;

  const [isEditing, setIsEditing] = useState(false); 
  const [editedPlanet, setEditedPlanet] = useState({ ...planet }); 

  const handleDelete = async () => {
    try {
      await deleteItem("planets", planet.id);
      alert("Planet deleted successfully.");
  
      
      setPlanets((prevPlanets) => prevPlanets.filter((p) => p.id !== planet.id));
  
      onClose(); 
    } catch (error) {
      console.error("Error deleting planet:", error.message);
    }
  };

  const handleAddToFavourites = async () => {
    try {
      await addToFavourites(planet.id);
      alert(`${planet.name} added to favorites.`);
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

  
    const handleEdit = async (updatedPlanet) => {
      try {
        await updateItem("planets", planet.id, updatedPlanet);
        alert("Planet updated successfully!");
    
      
        setPlanets((prevPlanets) =>
          prevPlanets.map((p) => (p.id === planet.id ? updatedPlanet : p))
        );
    
        onClose(); 
      } catch (error) {
        console.error("Error updating planet:", error.message);
      }
    };
    

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isEditing ? "Edit Planet" : planet.name}</h2>
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
          >
            <label>
              Name:
              <input
                type="text"
                value={editedPlanet.name}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>
            <label>
              Size:
              <input
                type="text"
                value={editedPlanet.size}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({ ...prev, size: e.target.value }))
                }
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                value={editedPlanet.type}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({ ...prev, type: e.target.value }))
                }
              />
            </label>
            <label>
              Description:
              <textarea
                value={editedPlanet.description}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Distance from Sun:
              <input
                type="text"
                value={editedPlanet.distance}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({
                    ...prev,
                    distance: e.target.value,
                  }))
                }
              />
            </label>
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            {planet.imageUrl && (
              <img src={planet.imageUrl} alt={planet.name} className="planet-image" />
            )}
            <p>Size: {planet.size}</p>
            <p>Color: {planet.color}</p>
            <p>Distance from Sun: {planet.distance} million km</p>
            <p>{planet.description}</p>
            {isAuthor ? (
              <>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)} // Активиране на режима за редактиране
                >
                  Edit
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </>
            ) : (
              <button
                className="favorite-button"
                onClick={handleAddToFavourites} // Добавяне към любими
              >
                Add to Favorites
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlanetModal;
