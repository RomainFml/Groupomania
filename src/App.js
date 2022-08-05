import React, { useEffect, useState } from "react";

import { UidContext } from "./components/AppContext";

import Routes from "./components/Routes";   
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions"; 

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch(); // 

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data); // Aattribue la data (l'id utilisateur) comme uid
        })
        .catch((err) => console.log("erreur : pas de token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid)); // Si l'uid existe on appelle l'action getUser
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App; 
