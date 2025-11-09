import React, { useEffect, useState, useRef } from "react";

const Banner = () => {
  const images = [
    "/asserts/banner/1.jpg",
    "/asserts/banner/2.jpg",
    "/asserts/banner/3.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef(null);

  const totalSlides = images.length;

  const slides = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (current === totalSlides) {
      setTransition(false);
      setCurrent(0);
    }
  };

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden overflow-x-hidden">
      <div
        ref={sliderRef}
        className={`flex w-full ${transition ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}>

        {slides.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 h-[500px] relative">
            <img src={img} className="w-full h-full object-cover block"/>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center pointer-events-none px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Welcome to Artify</h1>
              <p className="text-lg md:text-xl">Discover and Share Creative Artworks</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-50">
        {images.map((_, index) => (
          <button key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current % totalSlides === index ? "bg-white" : "bg-gray-400"}`}/>
        ))}
      </div>
    </div>
  );
};

export default Banner;
