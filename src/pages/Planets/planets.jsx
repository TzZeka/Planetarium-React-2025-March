import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; 
import PlanetModal from "../../Common/PlanetModal";
import "../../Styles/planets.css";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "planets"), (snapshot) => {
      const fetchedPlanets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlanets(fetchedPlanets);
    });

    return () => unsubscribe();
  }, []);

  const handlePlanetClick = (planet) => setSelectedPlanet(planet);
  const closePlanetModal = () => setSelectedPlanet(null);

  return (
    <div className="planets-page">
      <h1 className="planets-title">Explore the Planets</h1>
      <div className="planets-container">
        {planets.map((planet) => (
          <div key={planet.id} className="planet-card" onClick={() => handlePlanetClick(planet)}>
            <h2 className="planet-name">{planet.name}</h2>
            {planet.imageUrl && (
              <img src={planet.imageUrl} alt={planet.name} className="planet-image" />
            )}
            <p className="planet-size">Size: {planet.size}</p>
            <p className="planet-color">Color: {planet.color}</p>
          </div>
        ))}
      </div>
      {selectedPlanet && <PlanetModal planet={selectedPlanet} onClose={closePlanetModal} />}
    </div>
  );
};

export default Planets;
