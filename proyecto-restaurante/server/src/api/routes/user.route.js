const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const {
  registerUser,
  login,
  getUserById,
  editUser
} = require("../controllers/user.Controller");

// Ruta para registrar un usuario
router.post("/register", upload.single("picture"), registerUser);

// Ruta para el login
router.post("/login", login);

// Editar usuario
router.post("/edit", editUser);

// Ruta para obtener un usuario por ID (ejemplo)
router.get("/profile", getUserById);

module.exports = router;
