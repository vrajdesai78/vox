"use client";

import React, { useState, useRef, useEffect } from "react";

const sliderData = [
  {
    image: "/hero/slider-image.svg",
    title: "Tom Sawyer",
    location: "Ahmedabad",
    date: "18th October"
  },
  {
    image: "/hero/slider-image.svg",
    title: "Event 2",
    location: "Mumbai",
    date: "25th October"
  },
  {
    image: "/hero/slider-image.svg",
    title: "Event 3",
    location: "Delhi",
    date: "1st November"
  }
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if ('touches' in e && e.touches[0]) {
      setStartX(e.touches[0].clientX);
    } else if ('clientX' in e) {
      setStartX(e.clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    let currentX: number;
    if ('touches' in e && e.touches[0]) {
      currentX = e.touches[0].clientX;
    } else if ('clientX' in e) {
      currentX = e.clientX;
    } else {
      return;
    }
    const diff = startX - currentX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = window.innerWidth * 0.2; // 20% of screen width
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrentIndex((prevIndex) => 
          prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
        );
      }
    }
    setDragOffset(0);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const touchStartHandler = (e: TouchEvent) => handleDragStart(e as unknown as React.TouchEvent<HTMLDivElement>);
      const touchMoveHandler = (e: TouchEvent) => handleDragMove(e as unknown as React.TouchEvent<HTMLDivElement>);
      const touchEndHandler = () => handleDragEnd();

      slider.addEventListener('touchstart', touchStartHandler);
      slider.addEventListener('touchmove', touchMoveHandler);
      slider.addEventListener('touchend', touchEndHandler);

      return () => {
        slider.removeEventListener('touchstart', touchStartHandler);
        slider.removeEventListener('touchmove', touchMoveHandler);
        slider.removeEventListener('touchend', touchEndHandler);
      };
    }
  }, [isDragging]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div 
        ref={sliderRef}
        className="relative h-[500px] overflow-hidden rounded-lg"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-out`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100 - (isDragging && sliderRef.current ? dragOffset / sliderRef.current.offsetWidth * 100 : 0)}%)`
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              <p className="text-sm">
                {slide.location} · {slide.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      <button className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
        Buy tickets
      </button>
    </div>
  );
};

export default ImageSlider;