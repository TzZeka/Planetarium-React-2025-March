import React, { useState, useEffect } from "react";
import { getItems } from "../../utils/api";
import PlanetModal from "../../Common/PlanetModal";
import "../../Styles/planets.css";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getItems("planets");
      setPlanets(data);
    };
    fetchPlanets();
  }, []);

  const handlePlanetClick = (planet) => setSelectedPlanet(planet);
  const closePlanetModal = () => setSelectedPlanet(null);

  return (
    <div className="planets-page">
      <h1 className="planets-title">Explore the Planets</h1>
      <div className="planets-grid">
        {planets.map((planet) => (
          <div key={planet.id} className="planet-card" onClick={() => handlePlanetClick(planet)}>
            <h2>{planet.name}</h2>
            <p>Size: {planet.size}</p>
            <p>Color: {planet.color}</p>
          </div>
        ))}
      </div>
      {selectedPlanet && <PlanetModal planet={selectedPlanet} onClose={closePlanetModal} />}
    </div>
  );
};

export default Planets;
