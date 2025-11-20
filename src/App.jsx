import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExploreArtworks from "./pages/ExploreArtworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import AddArtworks from "./pages/AddArtworks";
import MyGallery from "./pages/MyGallery";
import MyFavorites from "./pages/MyFavorites";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function Layout() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreArtworks />} />
            <Route path="/artworks/:id" element={<ArtworkDetails />} />
            <Route path="/addArtwork" element={<AddArtworks />} />
            <Route path="/my-gallery" element={<MyGallery />} />
            <Route path="/my-favorites" element={<MyFavorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
