import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false); 

  // au clique sur un des boutons connexion/inscription l'autre devient false
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };
  return ( 
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null} //Au clique déclanche fonction handleModal
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null} 
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}   {/* Si signUp est sur true alors on appelle la fonction signUpForm */}
        {signInModal && <SignInForm />}   {/* inversement */}
      </div>
    </div>
  );
};
export default Log;