import React, { useEffect, useState } from "react";

const StatsDashboard = () => {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalLikes: 0,
    totalMembers: 0,
  });

  useEffect(() => {
    fetch("https://artify-server-af6p.onrender.com/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  return (
    <section className="py-8 bg-purple-600 dark:bg-purple-600 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3">

          <div className="py-3 px-4 text-center font-semibold text-white dark:text-white">
            Total artworks posted
          </div>
          <div className="py-3 px-4 text-center font-semibold text-white dark:text-white">
            Total likes
          </div>
          <div className="py-3 px-4 text-center font-semibold text-white dark:text-white">
            Total members
          </div>

          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-white dark:text-white">
              {stats.totalArtworks}
            </div>
          </div>
          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-white dark:text-white">
              {stats.totalLikes}
            </div>
          </div>
          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-white dark:text-white">
              {stats.totalMembers}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
