import React from "react";

const StatsDashboard = () => {
  const statsData = {
    totalArtworks: 245,
    totalLikes: 1842,
    totalMembers: 156,
  };

  return (
    <section className="py-8 bg-purple-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 border-b border-gray-300 dark:border-gray-700">

          <div className="py-3 px-4 text-center font-semibold text-gray-800 dark:text-gray-100">
            Total artworks posted
          </div>
          <div className="py-3 px-4 text-center font-semibold text-gray-800 dark:text-gray-100 border-l border-r border-gray-300 dark:border-gray-700">
            Total likes
          </div>
          <div className="py-3 px-4 text-center font-semibold text-gray-800 dark:text-gray-100">
            Total members
          </div>

          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {statsData.totalArtworks}
            </div>
          </div>
          <div className="py-4 px-2 text-center border-l border-r border-gray-300 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {statsData.totalLikes}
            </div>
          </div>
          <div className="py-4 px-2 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {statsData.totalMembers}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
