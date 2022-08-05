import React, { useState } from "react";
import axios from "axios";  // Librairie pour faire des requêtes a une API ou une database

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //connexion avec mail et password
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:5000/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {  
        console.log(res);
        if (res.data.errors) {
          console.log("Echec connexion")
        } else {                    //Si aucune erreur, accès page d'accueil
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">  {/* Quand on submit le form, on déclanche handleLogin. */}
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="SignInfo">
        <p>Utilisez votre adresse mail d'entreprise</p>
      </div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}   
        value={password}
      />
      <div className="SignInfo">
        <p></p>
      </div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};
export default SignInForm;