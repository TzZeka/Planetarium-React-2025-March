import React, { useEffect, useState } from "react";
import { getItems } from "../utils/api"; // Импорт на функция за четене
import PlanetModal from "./PlanetModal"; // Модален компонент за планетата

const Read = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getItems("planets");
      setPlanets(data);
    };
    fetchPlanets();
  }, []);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };

  return (
    <div>
      <h1>Planet Catalog</h1>
      <ul>
        {planets.map((planet) => (
          <li key={planet.id} onClick={() => handlePlanetClick(planet)}>
            {planet.name}
          </li>
        ))}
      </ul>
      {selectedPlanet && (
        <PlanetModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
};

export default Read;
