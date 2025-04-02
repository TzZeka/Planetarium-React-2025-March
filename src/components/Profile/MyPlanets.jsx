import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig"; // Уверете се, че пътят към конфигурацията е верен
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toastError } from "../../utils/toastNotifications";
import "../../styles/MyPlanets.css";

const MyPlanetsPage = () => {
  const { user } = useAuth();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    if (!user) return;

    const planetsQuery = query(
      collection(db, "planets"),
      where("createdBy", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      planetsQuery,
      (querySnapshot) => {
        const planetsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlanets(planetsList);
      },
      (error) => {
        toastError("Failed to load planets: " + error.message);
        console.error("Error loading planets:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="user-planets-container">
        <p>Please log in to view your created planets.</p>
      </div>
    );
  }

  return (
    <div className="user-planets-container">
      <h1>MY PLANETS</h1>
      {planets.length > 0 && (
        <p>
          You have created {planets.length}{" "}
          {planets.length === 1 ? "planet" : "planets"}.
        </p>
      )}
      {planets.length === 0 ? (
        <p>You haven't created any planets yet.</p>
      ) : (
        <div className="user-planets-grid">
          {planets.map((planet) => (
            <div key={planet.id} className="user-planet-card">
              <h2 className="user-planet-name">{planet.name}</h2>
              {planet.imageUrl ? (
                <img
                  src={planet.imageUrl}
                  alt={planet.name}
                  className="user-planet-image"
                />
              ) : (
                <img
                  src="/images/default-planet.jpg"
                  alt="Default Planet"
                  className="user-planet-image"
                />
              )}
              <p className="user-planet-size">Size: {planet.size}</p>
              <p className="user-planet-color">Color: {planet.color}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlanetsPage;
