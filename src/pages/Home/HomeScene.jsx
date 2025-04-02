import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { useNavigate } from "react-router";

const GalacticIntro = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Създаваме сцената.
    const scene = new THREE.Scene();

    // Създаваме камерата и рендеръра.
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Canvas на цял екран.
    renderer.setClearColor(0x000000, 0); // Прозрачен фон.
    mountRef.current.appendChild(renderer.domElement);

    // Добавяме звезди.
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Създаваме Слънцето и Земята.
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("./images/8k_sun.jpg");
    const earthTexture = textureLoader.load("./images/earth.jpg");

    const sunGeometry = new THREE.SphereGeometry(15, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(-50, 0, 0);
    scene.add(sunMesh);

    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 100,
      specular: new THREE.Color(0x4444ff),
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.set(-25, 0, 0);
    scene.add(earthMesh);

    // Осветление.
    const ambientLight = new THREE.AmbientLight(0x999999, 0.5);
    const directionalLight = new THREE.PointLight(0xffffff, 2, 1000);
    directionalLight.position.set(-50, 30, 30);
    scene.add(ambientLight, directionalLight);

    // Анимация на камерата.
    gsap.to(camera.position, {
      z: 50,
      duration: 5,
      ease: "power2.out",
      onUpdate: () => {
        camera.lookAt(earthMesh.position);
      },
      onComplete: () => {
        const menu = document.getElementById("menu");
        gsap.to(menu, { opacity: 1, y: 0, duration: 1 });
        // Анимирайте текста.
        gsap.fromTo(
          "#menu h1",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "bounce.out", delay: 0.2 }
        );
        gsap.fromTo(
          "#menu p",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.3, delay: 0.5 }
        );
        gsap.fromTo(
          "#menu button",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 1.5 }
        );
      },
    });

    // Анимация на звездите.
    const animateStars = () => {
      stars.rotation.y += 0.0005;
    };

    // Анимация на сцената.
    const animate = () => {
      requestAnimationFrame(animate);
      animateStars();
      earthMesh.rotation.y += 0.01; // Земята се върти около оста си.
      renderer.render(scene, camera);
    };
    animate();

    // Добавяме resize event за адаптация на размера.
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Проверяваме преди премахване на DOM елемента.
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Функция за обработка на клик на Explore.
  const handleExploreClick = () => {
    navigate("/planets");
  };

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: "98vw",
        height: "100vh", // Пълноекранен canvas.
        overflow: "hidden",
      }}
    >
      {/* Скритото меню */}
      <div
        id="menu"
        style={{
          position: "absolute",
          top: "40%",
          left: "70%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          textAlign: "center",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "24px",
          transition: "opacity 0.5s ease",
          colorAdjust: "exact",
          color: " rgba(2, 207, 222, 0.97)",
          
        }}
      >
        <h1>Welcome to the Universe<br />of Planetarium</h1>
        <p>Learn about the planets in our solar system.</p>
        <p>Create and explore unique planets.</p>
        <p>Start your cosmic journey!</p>
        <button
          onClick={handleExploreClick}
          style={{
            background: "linear-gradient(90deg, #ff8c00, #ffc107)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "12px 30px",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "18px",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(255, 140, 0, 0.5)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 6px 15px rgba(255, 140, 0, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 10px rgba(255, 140, 0, 0.5)";
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default GalacticIntro;
