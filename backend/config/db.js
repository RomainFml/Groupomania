const mongoose = require("mongoose")

mongoose
    .connect(`mongodb+srv://romainfamelipro:XX99TestPSW123ZZ@clustergroupo.flxp5.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.log('La connexion à mongoDB à échoué', err))

