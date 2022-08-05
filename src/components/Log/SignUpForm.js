import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {  //Formulaire inscription
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Gestion du formulaire
  const handleRegister = async (e) => {
    e.preventDefault();

      await axios({
        method: "post",  //formulaire = méthode POST
        url: `http://localhost:5000/api/user/register`, 
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => { // On recupere la réponse en paramètre
          if (res.data.errors) {
            console.log("Erreur : échec inscription")
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm /> 
          <span></span>
          <h4 className="succes">
            Inscription réussie, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="SignInfo">
            <p>Utilisez votre nom et prénom comme pseudo</p>
          </div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
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
            <p>Minimum 8 caractères</p>
          </div>
          <br />
          <input type="submit" value="Valider insciption" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;