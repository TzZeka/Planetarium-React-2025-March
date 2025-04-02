import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Импорти от postprocessing (трябва да ги инсталирате от three/examples)
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/PlanetBackground.css";

const PlanetBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- MathUtils Helpers ---
    const MathUtils = {
      normalize: (value, min, max) => (value - min) / (max - min),
      interpolate: (normValue, min, max) => min + (max - min) * normValue,
      map: (value, min1, max1, min2, max2) => {
        if (value < min1) value = min1;
        if (value > max1) value = max1;
        return MathUtils.interpolate(MathUtils.normalize(value, min1, max1), min2, max2);
      },
    };

    const markers = []; // За логване, ако е необходимо

    // --- Настройки ---
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const canvas = canvasRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(ww, wh);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x194794, 0, 100);

    // Clock
    const clock = new THREE.Clock();

    // --- Camera и група за нея ---
    let cameraRotationProxyX = 3.14159;
    let cameraRotationProxyY = 0;

    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
    camera.rotation.y = cameraRotationProxyX;
    camera.rotation.z = cameraRotationProxyY;

    const cameraGroup = new THREE.Group();
    cameraGroup.position.z = 400;
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    // --- Postprocessing (composer, renderPass, bloomPass) ---
    const renderScene = new RenderPass(scene, camera);
    const params = {
      exposure: 1.3,
      bloomStrength: 0.9,
      bloomThreshold: 0,
      bloomRadius: 0,
    };
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(ww, wh), 1.5, 0.4, 0.85);
    bloomPass.renderToScreen = true;
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    const composer = new EffectComposer(renderer);
    composer.setSize(ww, wh);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- Създаване на кривата (CatmullRom) ---
    const pointsArray = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0],
    ];
    // Преобразуваме точките – обръщаме реда на координатите според оригиналния код
    const points = pointsArray.map((pt) => new THREE.Vector3(pt[0], pt[2], pt[1]));
    const path = new THREE.CatmullRomCurve3(points);
    path.tension = 0.5;

    // --- Външна тръба ---
    const tubeGeometry = new THREE.TubeGeometry(path, 300, 4, 32, false);
    const textureLoader = new THREE.TextureLoader();

    
    const texture = textureLoader.load("/images/3d_space_5.jpg",
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.offset.set(0, 0);
        tex.repeat.set(15, 2);
      }
    );
    
    const mapHeight = textureLoader.load(
      "/images/waveform-bump3.jpg",
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.offset.set(0, 0);
        tex.repeat.set(15, 2);
      }
    );

    const material = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: texture,
      shininess: 20,
      bumpMap: mapHeight,
      bumpScale: -0.03,
      specular: 0x0b2349,
    });

    const tubeMesh = new THREE.Mesh(tubeGeometry, material);
    scene.add(tubeMesh);

    // --- Вътрешна тръба (wireframe) ---
    const innerTubeGeometry = new THREE.TubeGeometry(path, 150, 3.4, 32, false);
    const edgesGeo = new THREE.EdgesGeometry(innerTubeGeometry);
    const lineMat = new THREE.LineBasicMaterial({
      linewidth: 2,
      opacity: 0.2,
      transparent: true,
    });
    const wireframe = new THREE.LineSegments(edgesGeo, lineMat);
    scene.add(wireframe);

    // --- Светлина ---
    const light = new THREE.PointLight(0xffffff, 0.35, 4, 0);
    light.castShadow = true;
    scene.add(light);

    // --- Функция за анимиране на камерата по кривата ---
    let p1, p2;
    const updateCameraPercentage = (percentage) => {
      p1 = path.getPointAt(percentage);
      p2 = path.getPointAt(percentage + 0.03);

      cameraGroup.position.set(p1.x, p1.y, p1.z);
      cameraGroup.lookAt(p2);
      light.position.set(p2.x, p2.y, p2.z);
    };

    let cameraTargetPercentage = 0;
    let currentCameraPercentage = 0;

    
    const tubePerc = { percent: 0 };
    gsap.timeline({
      scrollTrigger: {
        trigger: ".scrollTarget",
        start: "top top",
        end: "+=100vh",
        scrub: 300,
      },
    }).to(tubePerc, {
      percent: 0.96,
      ease: "linear",
      duration: 10,
      onUpdate: () => {
        cameraTargetPercentage = tubePerc.percent;
      },
    });

    // --- Particle System с BufferGeometry ---
    // Зареждаме локална текстура за частиците от /public/images/spikey.png
    const spikeyTexture = textureLoader.load("/images/spikey.png");
    const particleCount = 6800;

    // Първи набор частици
    const vertices1 = [];
    for (let i = 0; i < particleCount; i++) {
      vertices1.push(
        Math.random() * 500 - 250,
        Math.random() * 50 - 25,
        Math.random() * 500 - 250
      );
    }
    const geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute("position", new THREE.Float32BufferAttribute(vertices1, 3));

    // Втори набор частици
    const vertices2 = [];
    for (let i = 0; i < particleCount; i++) {
      vertices2.push(
        Math.random() * 500,
        Math.random() * 10 - 5,
        Math.random() * 500
      );
    }
    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute("position", new THREE.Float32BufferAttribute(vertices2, 3));

    // Трети набор частици
    const vertices3 = [];
    for (let i = 0; i < particleCount; i++) {
      vertices3.push(
        Math.random() * 500,
        Math.random() * 10 - 5,
        Math.random() * 500
      );
    }
    const geometry3 = new THREE.BufferGeometry();
    geometry3.setAttribute("position", new THREE.Float32BufferAttribute(vertices3, 3));

    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: spikeyTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem1 = new THREE.Points(geometry1, pMaterial);
    const particleSystem2 = new THREE.Points(geometry2, pMaterial);
    const particleSystem3 = new THREE.Points(geometry3, pMaterial);
    scene.add(particleSystem1);
    scene.add(particleSystem2);
    scene.add(particleSystem3);

    // --- Render Loop ---
    const renderLoop = () => {
      currentCameraPercentage = cameraTargetPercentage;
      // Плавно завъртане на камерата (интерполация)
      camera.rotation.y += (cameraRotationProxyX - camera.rotation.y) / 15;
      camera.rotation.x += (cameraRotationProxyY - camera.rotation.x) / 15;

      updateCameraPercentage(currentCameraPercentage);

      // Анимиране на частиците
      particleSystem1.rotation.y += 0.00002;
      particleSystem2.rotation.x += 0.00005;
      particleSystem3.rotation.z += 0.00001;

      composer.render();
      requestAnimationFrame(renderLoop);
    };
    requestAnimationFrame(renderLoop);

    const onMouseMove = (evt) => {
      cameraRotationProxyX = MathUtils.map(evt.clientX, 0, window.innerWidth, 3.24, 3.04);
      cameraRotationProxyY = MathUtils.map(evt.clientY, 0, window.innerHeight, -0.1, 0.1);
    };
    window.addEventListener("mousemove", onMouseMove, false);

    const onCanvasClick = () => {
      markers.push(p1);
      console.clear();
      console.log(JSON.stringify(markers));
    };
    canvas.addEventListener("click", onCanvasClick);

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Cleanup при unmount на компонента
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onCanvasClick);
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <>
      <div className="experience">
        <canvas ref={canvasRef} />
      </div>
      <div className="vignette-radial"></div>
      <div className="scrollTarget"></div>
    </>
  );
};

export default PlanetBackground;
