const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const fs = require("fs");
const ObjectID = require("mongoose").Types.ObjectId;

//créer un post
module.exports.createPost = async (req, res) => {
  let fileName;
  if (req.file) {
    try {
      if (
        req.file.mimetype !== "image/jpg" && // types de fichiers images acceptés
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      )
        throw console.log("Type de fichier invalide");
      if (req.file.size > 1000000) //poids max de l'image
        throw console.log("Fichier trop volumineux");

    } catch (error) {
        return res.status(201).json({ error });
    }
    fileName = req.body.posterId + Date.now() + ".jpg"; //nouveau nom du fichier
    fs.writeFile(   // stockage de la nouvelle image
      `../public/uploads/posts/${fileName}`,
      req.file.buffer,
      (err) => {
        if (err) throw err;
      }
    );
  }
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file ? `./uploads/posts/` + fileName : "",
    likers: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//affichage des posts
module.exports.readPost = (req, res) => {  
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur dans l'obtention des données : " + err);
  }).sort({ createdAt: -1 });
};

//màj d'un post
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) // Controle de l'ID
    return res.status(400).send("ID inconnu : " + req.params.id); 

  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.status(200).send(docs);
      else console.log("Erreur lors de la mise à jour : " + err);
    }
  );
};

//màj de l'image
module.exports.updateImage = (req, res) => {
  let fileName;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id); 
  if (req.file) {
    try {
      if (
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      )
        console.log("Type de fichier invalide");
      if (req.file.size > 1000000) console.log("Fichier trop volumineux");
    } catch (err) {
      return res.status(201).json({ errors: "erreur" });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
    fs.writeFile(
      `../public/uploads/posts/${fileName}`,
      req.file.buffer,
      (err) => {
        if (err) throw err;
      }
    );
    const updatedRecord = {
      picture: `../public/uploads/posts/` + fileName,
    };
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else console.log("Erreur lors de la mise à jour : " + err);
      }
    );
  } else {
    return res.status(400).send("Erreur lors de la mise à jour");
  }
};

//supprimer un post
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id); 

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      fs.unlink(docs.picture, () => {});
      res.send(docs);
    } else console.log("Erreur lors de la suppression : " + err);
  });
};

//like d'un post
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //
    return res.status(400).send("ID inconnu : " + req.params.id); //

  try {
    let updatedLikers = await PostModel.findByIdAndUpdate(
      // mise à jour des utilisateurs ayant like ce post
      req.params.id, 
      { $addToSet: { likers: req.body.id } }, 
      { new: true }
    );
    res.json({ updatedLikers });
    let updatedLikes = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true }
    );
    res.json({ updatedLikes });
  } catch (err) {
    return;
  }
};

//unlike d'un post
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //
    return res.status(400).send("ID inconnu : " + req.params.id); //

  try {
    let updatedLikers = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true }
      );
    res.json({ updatedLikers });
    let updatedLikes = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true }
      );
    res.json({ updatedLikes });
  } catch (err) {
    return;
  }
};