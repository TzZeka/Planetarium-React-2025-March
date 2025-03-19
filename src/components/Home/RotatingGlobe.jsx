// Code for rotating globe on home page
// This code is used to create a rotating globe on the home page of the website. 
// It uses the Three.js library to create a 3D scene with a sphere geometry representing the Earth. 
// The globe rotates smoothly around its y-axis, giving the illusion of a spinning planet. 
// The globe is textured with an image of the Earth's night lights, giving it a realistic appearance. 
// The scene also includes two light sources to illuminate the globe and create a more dynamic visual effect. 
// The camera is positioned to give a good view of the globe and the animation loop is set up to continuously update the scene and render it to the screen. 
// The component returns a div element with a ref that is used to mount the renderer's canvas element to the DOM. 
// The useEffect hook is used to set up the scene when the component is mounted and clean up the resources when the component is unmounted. 
// The globe component is then exported for use in the home page of the website.


import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Globe = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene and Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({  antialias: true, alpha: true  });

        renderer.setSize(window.innerWidth * 1, window.innerHeight * 1); // Adjust size
        mountRef.current.appendChild(renderer.domElement);

        // Add Globe
        const geometry = new THREE.SphereGeometry(2, 64, 64);
        const texture = new THREE.TextureLoader().load('/images/8k_earth_nightmap.jpg'); // Ensure correct path
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Add Lights
        const light1 = new THREE.PointLight(0xffffff, 1, 100);
        light1.position.set(10, 10, 10);
        scene.add(light1);

        const light2 = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(light2);
        

        // Осветление
        const pointLight = new THREE.PointLight(0xffffff, 2, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const secondLight = new THREE.PointLight(0xffffff, 1.5, 100);
        secondLight.position.set(-10, -10, 10);
        scene.add(secondLight);

        const ambientLight = new THREE.AmbientLight(0x666666);
        scene.add(ambientLight)

        // Camera Position
        camera.position.z = 5;

        // Animation
        let lastTime = 0;
        const frameRate = 60; // Цели 30 кадъра в секунда

        const animate = (time) => {
            if (time - lastTime < 1000 / frameRate) {
            requestAnimationFrame(animate);
        return;
        }
        lastTime = time;

    // Рендиране
            globe.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
         return () => {
        if (renderer) {
            renderer.dispose();
        }
        if (mountRef.current) { 
            mountRef.current.removeChild(renderer.domElement);
        }
    };
    }, []);

    return <div ref={mountRef} style={{ position: "absolute", top: "60%", left: "85%", transform: "translate(-50%, -50%)" }} />;
};

export default Globe;
