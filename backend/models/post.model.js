// Appelle mongoose pour les schema
const mongoose = require('mongoose')


// Création du schema des posts
const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true,
        },
        message: {
            type:String,
            trim: true,
            maxlength: 240, //limite la longueur du post à 240 caractères
        },
        picture: {
            type: String,
        },
        likers: {   // On incrémente un tableau avec les ID des personnes qui likent les posts
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('post', PostSchema)