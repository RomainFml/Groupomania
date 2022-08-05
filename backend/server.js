// Appelle du module Express
const express = require("express");
// Gère les cookies
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const cors = require("cors");

const app = express();

//Paramètre CORS
const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  default: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/// middleware checkUser sur chaque route
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {// déclanche le middleware requireAuth(verif token) 
  res.status(200).send(res.locals.user._id);
});


//Déclaration des routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Ecoute du serveur
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});