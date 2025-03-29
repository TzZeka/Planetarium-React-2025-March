import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { planets } from "../../utils/planet";
import "../../Styles/DynamicPlanet.css";

const MainScene = () => {
  const mountRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // За избраната планета

  useEffect(() => {
    const mount = mountRef.current;

    // Създаване на сцена
    const scene = new THREE.Scene();

    // Камера
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Рендерер с прозрачен фон
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Светлини
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Създаване на планети
    const planetMeshes = [];
    const textureLoader = new THREE.TextureLoader();
    planets.forEach((planet, index) => {
      const geometry = new THREE.SphereGeometry(1, 32, 32); // Сфера за планета
      const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(planet.texture),
      });

      const planetMesh = new THREE.Mesh(geometry, material);
      planetMesh.name = planet.name; // Създаване на име
      planetMesh.userData = planet.details; // Запазване на детайли
      planetMesh.position.x = index * 3 - planets.length; // Подреждане на планетите

      scene.add(planetMesh);
      planetMeshes.push(planetMesh); // Запазване за взаимодействие
    });

    // OrbitControls с изключен zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Изключване на zoom

    // Raycaster за интеракция
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        setSelectedPlanet({
          name: clickedPlanet.name,
          details: clickedPlanet.userData,
        });
      }
    };

    // Добавяне на събития за мишката
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    // Анимация
    const animate = () => {
      planetMeshes.forEach((mesh) => (mesh.rotation.y += 0.005)); // Завъртане на планетите
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Почистване при размонтиране на компонента
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
      {selectedPlanet && (
        <div className="planet-details">
          <h2>{selectedPlanet.name}</h2>
          <p>{selectedPlanet.details}</p>
          <button onClick={() => setSelectedPlanet(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MainScene;
