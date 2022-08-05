const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

const maxAge = 1000 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24, // Le token est valable pendant 24h 
  });
};

// Crée un utilisateur
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password }); //Pour créer un utilisateur ces trois champs sont obligatoires
    res.status(201).json({ user: user._id }); // Renvoie le user_id (soit le pseudo, email, password)
  } 
  catch (error) {
  console.log("Echec de la création de l'utilisateur");
  }
};

// Connexion
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body; //recoit email et password

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, { //crée un cookie si correspondance
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge,
    });
    res.status(200).json({ user: user._id });
  }
  catch (error) {
    console.log("Echec de la connexion");
    }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); //on attribue un cookie (1ms), puis redirige l'utilisateur
  res.redirect("/");
};