// Appelle le UserModel de 
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//Obtenir les données des utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({}, {pseudo:true, likes:true})
  //les données sont renvoyées 
  res.status(200).json(users);
};

//Obtenir les données d'un utilisateur
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    //Si l'id est valide on accède aux données de l'utilisateur 
    if (!err) res.send(docs);
    else console.log("ID inconnu : " + err);
  }).select("-password"); // on ne récupère pas le mot de passe pour des raisons de sécurité.
};