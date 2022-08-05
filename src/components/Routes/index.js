import React from "react";
// Import des dépendances
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Navbar from "../Navbar";
import Posts from "../../pages/Posts";

// Création des différentes routes pour le navigateur
const index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/Publication" element={<Posts />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default index;