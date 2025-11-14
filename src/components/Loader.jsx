import React from "react";

const Loader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      <p className="mt-4 text-purple-700 font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
