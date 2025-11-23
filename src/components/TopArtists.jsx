import React, { useEffect, useState } from "react";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/artworks")
      .then((res) => res.json())
      .then((data) => {
        const countMap = {};
        data.forEach((art) => {
          if (countMap[art.artist]) {
            countMap[art.artist].count += 1;
          } else {
            countMap[art.artist] = {
              name: art.artist,
              count: 1,
              avatar: art.image,
            };
          }
        });

        const sortedArtists = Object.values(countMap)
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        setArtists(sortedArtists);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2 transition-colors duration-500">
          Top Artists
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6 transition-colors duration-500">
          Most active creators this week
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 flex flex-col items-center transition-colors duration-500 hover:shadow-2xl">
              <img src={artist.avatar}
                 className="w-20 h-20 rounded-full mb-4 object-cover"/>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 transition-colors duration-500">
                {artist.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
                {artist.count} Arts
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtists;
