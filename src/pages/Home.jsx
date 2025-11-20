import React from "react";
import Banner from "../components/Banner";
import FeaturedArtworks from "../components/FeaturedArtworks";
import StatsDashboard from "../components/StatsDashboard";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedArtworks />
      <StatsDashboard />
    </div>
  );
};

export default Home;
