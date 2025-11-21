import React from "react";

const StatsDashboard = () => {
  const statsData = {
    totalArtworks: 245,
    totalLikes: 1842,
    totalMembers: 156,
  };

  return (
    <section className="py-8 bg-purple-400 dark:bg-purple-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3">

          <div className="py-3 px-4 text-center font-semibold text-gray-800 dark:text-white">
            Total artworks posted
          </div>
          <div className="py-3 px-4 text-center font-semibold text-gray-800 dark:text-white">
            Total likes
          </div>
          <div className="py-3 px-4 text-center font-semibold text-gray-800 dark:text-white">
            Total members
          </div>

          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {statsData.totalArtworks}
            </div>
          </div>
          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {statsData.totalLikes}
            </div>
          </div>
          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {statsData.totalMembers}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
