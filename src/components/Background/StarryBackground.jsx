import React, { useEffect } from 'react';
import './StarryBackground.css';

const StarryBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const numberOfStars = 100; // Брой звезди
      const starContainer = document.querySelector('.starry-background');

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3; // Размер на звездите
        const x = Math.random() * 100; // Позиция по X
        const y = Math.random() * 100; // Позиция по Y
        const speed = Math.random(); // Различна скорост за всяка звезда

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.dataset.speed = speed.toFixed(2); // Запазваме скоростта като атрибут

        starContainer.appendChild(star);
      }
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 50; // Позиция X на мишката
      const y = (e.clientY / window.innerHeight) * 50; // Позиция Y на мишката

      document.querySelectorAll('.star').forEach((star) => {
        const speed = parseFloat(star.dataset.speed || 1); // Вземаме скоростта на звездата
        star.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    const handleTouchMove = (e) => {
      const x = (e.touches[0].clientX / window.innerWidth) * 50; // Докосване X
      const y = (e.touches[0].clientY / window.innerHeight) * 50; // Докосване Y

      document.querySelectorAll('.star').forEach((star) => {
        const speed = parseFloat(star.dataset.speed || 1);
        star.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    createStars();

    // Добавяне на слушатели за мишка и докосване
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Почистване след демонтиране на компонента
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="starry-background">
      <h1 className="title">Planetarium</h1>
      <p className="description">Welcome to the Planetarium</p>
    </div>
  );
};

export default StarryBackground;
