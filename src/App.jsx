import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExploreArtworks from "./pages/ExploreArtworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import AddArtworks from "./pages/AddArtworks";
import MyGallery from "./pages/MyGallery";
import MyFavorites from "./pages/MyFavorites";
import Footer from "./components/Footer";
import app from "./authentication/firebaseConfig";
import Register from "./authentication/Register";
import Login from "./authentication/Login";

function App() {
  useEffect(() => {
    console.log("Firebase App Initialized:", app);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreArtworks />} />
            <Route path="/artworks/:id" element={<ArtworkDetails />} />
            <Route path="/addArtwork" element={<AddArtworks />} />
            <Route path="/my-gallery" element={<MyGallery />} />
            <Route path="/my-favorites" element={<MyFavorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;