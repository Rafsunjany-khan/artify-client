import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/api/banners")
      .then(res => setBanners(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
        ref={sliderRef}
      >
        {banners.map(banner => (
          <div key={banner._id} className="w-full flex-shrink-0 h-full relative">
            <img src={banner.image} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pointer-events-none">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{banner.title}</h1>
              <p className="text-lg md:text-xl">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-50">
        {banners.map((_, index) => (
          <button key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-gray-400"} transition-colors duration-500`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
