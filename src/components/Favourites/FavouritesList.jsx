import React, { useState, useEffect } from "react";
import { getFavouritePlanets, removeFromFavourites } from "./favouritesService";
import "../../Styles/Favourites.css";

const FavouritesCatalogue = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favouritePlanets = await getFavouritePlanets();
        setPlanets(favouritePlanets);
      } catch (err) {
        console.error("Error fetching favourites:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleRemoveFavourite = async (planetId) => {
    try {
      await removeFromFavourites(planetId);
      setPlanets((prevPlanets) =>
        prevPlanets.filter((planet) => planet.id !== planetId)
      ); // Обновява локалния state
      console.log(`Removed planet with ID: ${planetId}`);
    } catch (err) {
      console.error("Error deleting planet:", err.message);
    }
  };

  if (loading) {
    return <p>Loading your favourite planets...</p>;
  }

  if (!planets.length) {
    return <p>No favourite planets yet.</p>;
  }

  return (
    <div className="planets-catalogue">
      <h2>Your Favourite Planets</h2>
      <div className="planets-container">
        {planets.map((planet) => (
          <div key={planet.id} className="planet-card">
            <h3>{planet.name}</h3>
            {planet.imageUrl && (
              <img src={planet.imageUrl} alt={planet.name} className="planet-image" />
            )}
            <p>{planet.description}</p>
            <p>Size: {planet.size}</p>
            <p>Type: {planet.type}</p>
            <button
              className="remove-button"
              onClick={() => handleRemoveFavourite(planet.id)}
            >
              Remove from Favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesCatalogue;
