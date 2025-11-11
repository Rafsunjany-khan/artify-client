import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExploreArtworks from "./pages/ExploreArtworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import AddArtworks from "./pages/AddArtworks";

import Footer from "./components/Footer";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreArtworks />} />
         <Route path="/artworks/:id" element={<ArtworkDetails />} />
        <Route path="/addArtwork" element={<AddArtworks />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
