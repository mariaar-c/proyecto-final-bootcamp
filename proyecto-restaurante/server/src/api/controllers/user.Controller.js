const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Función para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ msg: "Username already exists." });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      password: passwordHash,
    });

    // Guardar usuario en la base de datos
    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = jwt.sign(
        { id: savedUser._id, username: savedUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    res
      .status(201)
      .json({ token, message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Error during registration:", err); // Imprimir error en la consola
    res.status(500).json({ error: err.message });
  }
};

// Función para el login de un usuario
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario por nombre de usuario
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Generar un token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar el token y los detalles del usuario (sin contraseña) en la respuesta
    res
      .status(200)
      .json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    console.error("Error during login:", err); // Imprimir error en la consola
    res.status(500).json({ error: err.message });
  }
};

// Función para obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ msg: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Invalid token" });

      const userId = decoded.id;

      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ msg: "User not found" });

      return res.status(200).json(user);
    });
  } catch (err) {
    console.error("Error during getUserById:", err); // Imprimir error en la consola
    res.status(500).json({ error: err.message });
  }
};

const editUser = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        const updated = await User.findByIdAndUpdate(user.id, user,  { new: true });
        if(!updated) {
            res.status(404).json({ message: "No se ha podido modificar el usuario"});
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
  registerUser,
  login,
  getUserById,
  editUser
};
