import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    axios
      .get("https://artify-server-af6p.onrender.com/api/banners")
      .then((res) => setBanners(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  useEffect(() => {
    if (!sliderRef.current) return;

    const handleTransitionEnd = () => {
      if (current === banners.length) {
        setIsTransitioning(false);
        setCurrent(0);
      }
    };

    sliderRef.current.addEventListener("transitionend", handleTransitionEnd);

    return () =>
      sliderRef.current.removeEventListener("transitionend", handleTransitionEnd);
  }, [current, banners.length]);

  if (banners.length === 0) return null;

  const slides = [...banners, banners[0]];

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        ref={sliderRef}
        className={`flex w-full h-full ${
          isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((banner, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <img src={banner.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {banner.title}
              </h1>
              <p className="text-lg md:text-xl">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setIsTransitioning(true);
            }}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}/>
        ))}
      </div>
    </div>
  );
};

export default Banner;
