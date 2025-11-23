import React from "react";
import Banner from "../components/Banner";
import FeaturedArtworks from "../components/FeaturedArtworks";
import StatsDashboard from "../components/StatsDashboard";
import TopArtists from "../components/TopArtists";
import CommunityHighlights from "../components/CommunityHighlights";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedArtworks />
      <StatsDashboard />
      <TopArtists />
      <CommunityHighlights />
    </div>
  );
};

export default Home;
