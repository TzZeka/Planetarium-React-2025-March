import React, { useState, useEffect } from "react";
import { getFavouritePlanets, removeFromFavourites } from "./favouritesService";
import "../../Styles/Favourites.css";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from './../../utils/toastNotifications';

const FavouritesCatalogue = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favouritePlanets = await getFavouritePlanets();
        setPlanets(favouritePlanets);
      } catch (err) {
        toastError("Error fetching favourites:", err.message);
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
      );
      toastSuccess(`Removed planet with ID: ${planetId}`);
    } catch (err) {
      toastError("Error deleting planet:", err.message);
    }
  };

  if (loading) {
    return <p>Loading your favourite planets...</p>;
  }

  if (!planets.length) {
    return (
      <div className="planets-catalogue no-favourites">
        <h2>Your Favourite Planets</h2>
        <p className="no-favourites">You haven't added any favourite planets yet.</p>
        <p className="browse-planets">
        You can teleport to
        <button onClick={() => navigate("/planets")} >
              Browse Planets
        </button>
          to add your favourite planets.
        </p>
      </div>
    );
  }

  return (
    <div className="planets-catalogue">
      <h2>Your Favourite Planets</h2>
      <div className="planets-container">
        {planets.map((planet) => (
          <div key={planet.id} className="planet-card">
            <h3>{planet.name}</h3>
            {planet.imageUrl && (
              <img
                src={planet.imageUrl}
                alt={planet.name}
                className="planet-image"
              />
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
