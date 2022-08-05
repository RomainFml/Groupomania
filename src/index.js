//Import React
import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";

// Import librairie REDUX
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { getUsers } from "./actions/users.actions";



// Création du Store
const store = configureStore({
  reducer: rootReducer, // Recupère les reducers
  middleware: [thunk], // permet de faire des requêtes async avec redux
});

store.dispatch(getUsers()); 


//Contenu react inséré dans la div root de l'index pour le rendu front 
// On crée le store avec Provider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);