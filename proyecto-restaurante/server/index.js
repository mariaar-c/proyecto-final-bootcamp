const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { connectDB } = require("./src/utils/db.js");
const cloudinary = require("cloudinary").v2;

// Rutas
const restaurantRoutes = require("./src/api/routes/restaurant.route.js");
const menuRoutes = require("./src/api/routes/menu.route.js");
const userRoutes = require("./src/api/routes/user.route");
const homeRoutes = require("./src/api/routes/home.route.js");
const reservationRoutes = require("./src/api/routes/reservation.route.js");
const reviewRoutes = require("./src/api/routes/review.route.js");

// Configuración
dotenv.config();
const app = express();

// Seguridad
app.use(helmet());
app.use(cors());

// Middleware para parsing de cuerpos de solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack); // Imprime el stack trace en la consola
  res
    .status(500)
    .json({ message: "An internal server error occurred", error: err.message });
});

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

connectDB();

// Archivos estáticos
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Rutas
app.use("/", homeRoutes);
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/menus", menuRoutes);
app.use("/reservations", reservationRoutes);
app.use("/reviews", reviewRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
