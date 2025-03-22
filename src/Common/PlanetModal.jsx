import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { deleteItem } from "../utils/api";
import "../Styles/PlanetModal.css";

const PlanetModal = ({ planet, onClose, onDelete, onFavorite }) => {
  const { user } = useAuth();
  const isAuthor = user && user.uid === planet.createdBy;

  const handleDelete = async () => {
    try {
      await deleteItem("planets", planet.id);
      alert("Planet deleted successfully.");
      onDelete(planet.id);
      onClose();
    } catch (error) {
      console.error("Error deleting planet:", error.message);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // Спира затварянето при клик в модала
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{planet.name}</h2>
        {planet.imageUrl && (
          <img src={planet.imageUrl} alt={planet.name} className="planet-image" />
        )}
        <p>Size: {planet.size}</p>
        <p>Color: {planet.color}</p>
        <p>Distance from Sun: {planet.distance} million km</p>
        <p>{planet.description}</p>
        {isAuthor ? (
          <>
            <button className="edit-button">Edit</button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : (
          <button className="favorite-button" onClick={() => onFavorite(planet)}>
            Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanetModal;
