const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.get(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//importing database file
const { connectToMongoDB } = require("./src/Db/connection");

//below are imported files
const authRoutes = require("./src/routes/auth");
const fieldOfficerRoutes = require("./src/routes/FieldOfficer");

//Below are middllewares
app.use("/auth-user", authRoutes);
app.use("/field-officer", fieldOfficerRoutes);

//below is database connection and server starting.
const uri =
  "mongodb+srv://nomanmangalzai4:Katapoorkooz1@cluster0.nvltbzm.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5002;

connectToMongoDB()
  .then(() => {
    // app.use("/", routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${[PORT]}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });
