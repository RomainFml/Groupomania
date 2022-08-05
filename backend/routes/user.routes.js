// On appelle le router express pour crée les routes
const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//Routes auth (Connexion/Inscription et Déconnexion)
router.post("/register", authController.signUp); 
router.post("/login", authController.signIn);   
router.get("/logout", authController.logout); 

//Routes users
router.get("/", userController.getAllUsers); 
router.get("/:id", userController.userInfo); 

module.exports = router; 