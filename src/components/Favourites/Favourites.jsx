import React, { useState } from "react";
import { addToFavourites, removeFromFavourites } from "./favouritesService";
import "../../Styles/Favourites.css";

const Favourites = ({ itemId, favourites = [] }) => { 
  if (!itemId) {
    return null;
  }
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(itemId)
  );
  
  const handleFavourite = async () => {
    try {
      if (isFavourite) {
        await removeFromFavourites(itemId);
      } else {
        await addToFavourites(itemId);
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <button onClick={handleFavourite} className={`favourites-button ${isFavourite ? "favourited" : ""}`}>
      {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
    </button>
  );
};

export default Favourites;
