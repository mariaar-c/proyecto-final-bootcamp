const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const { name, host } = db.connection;
    console.log(
      `Conectado a la base de datos "${name}" en el servidor "${host}".`
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDB };
