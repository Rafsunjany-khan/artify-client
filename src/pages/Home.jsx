import React from "react";
import Banner from "../components/Banner";
import FeaturedArtworks from "../components/FeaturedArtworks";
import StatsDashboard from "../components/StatsDashboard";
import TopArtists from "../components/TopArtists";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedArtworks />
      <StatsDashboard />
      <TopArtists />
    </div>
  );
};

export default Home;
