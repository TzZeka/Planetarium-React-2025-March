import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { deleteItem, updateItem } from "../utils/api";
import { addToFavourites } from "../components/Favourites/favouritesService";
import "../Styles/Planets.css";
import { toastError, toastInfo, toastSuccess } from './../utils/toastNotifications';

const PlanetModal = ({ planet, onClose }) => {
  const { user } = useAuth();
  const isAuthor = user && user.uid === planet.createdBy;

  const [isEditing, setIsEditing] = useState(false);
  const [editedPlanet, setEditedPlanet] = useState({ ...planet });

  const handleDelete = async () => {
    try {
      await deleteItem("planets", planet.id);
      toastSuccess("Planet deleted successfully.");
      onClose();
    } catch (error) {
      toastError("Error deleting planet:", error.message);
    }
  };

  const handleAddToFavourites = async () => {
    try {
      await addToFavourites(planet.id);
      toastInfo(`${planet.name} added to favorites.`);
    } catch (error) {
      toastError("Error adding to favorites:", error.message);
    }
  };

  const handleEdit = async (updatedPlanet) => {
    if (!updatedPlanet || Object.keys(updatedPlanet).length === 0) {
      toastInfo("Please fill out all required fields.");
      return;
    }

    try {
      await updateItem("planets", planet.id, updatedPlanet);
      toastSuccess("Planet updated successfully!");
      onClose();
    } catch (error) {
      toastError("Error updating planet:", error.message);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isEditing ? "Edit Planet" : planet.name}</h2>
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editedPlanet);
            }}
          >
            <label>
              Name:
              <input
                type="text"
                value={editedPlanet.name || ""}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>
            <label>
              Size:
              <input
                type="text"
                value={editedPlanet.size || ""}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({ ...prev, size: e.target.value }))
                }
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                value={editedPlanet.type || ""}
                onChange={(e) =>
                  setEditedPlanet((prev) => ({ ...prev, type: e.target.value }))
                }
              />
            </label>
            <label>
              Description:
              <textarea
                value={editedPlanet.description || ""}
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
                value={editedPlanet.distance || ""}
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
                  onClick={() => setIsEditing(true)}
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
                onClick={handleAddToFavourites}
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
