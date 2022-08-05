// Package mongoose pour crée les schemas
const mongoose = require("mongoose");
// Appelle la fonction isEmail de validator pour s'assurer de la conformité du mail
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: { //entre 1 et 40 caractères, unique
      type: String,
      required: true,
      minLength: 1,
      maxLength: 40,
      unique: true,
      trim: true, //supprime les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail], 
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { //min 8 caractères
      type: String,
      required: true,
      max: 1024,
      minlength: 8,
    
    },
    likes: {
      type: [String], // Incrémente le tableau de likes par l'id de l'user
    },
    isAdmin: { //l'admin peut modifier et supprimer tous les posts pour modération
      type: Boolean,
      required: true,
      default: false,  
    }
  },
);


userSchema.pre("save", async function (next) { // methode .pre pour être utiliser avant de stocker dans la database
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // hash et salage du password
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw console.log("mot de passe incorrect");
  }
  throw console.log("mail incorrect");
};

const UserModel = mongoose.model("user", userSchema); // On incrémente userSchema dans la table user de la database

module.exports = UserModel;