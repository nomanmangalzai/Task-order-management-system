const fieldOfficersCollection = require("../models/fieldOfficer.js");
const kabulEmployees = "require(../models/fieldOfficer.js);";

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const secret = require("../utilities/config.js").secret; //contains secret key used to sign tokens
const emailValidator = require("node-email-validation");

const signIn = async (req, res, next) => {
  console.log("The signIn API hit");

  const { emailAddress, password, isFieldOfficer, isKabulEmployee } = req.body;

  ////////////////////////////////////////////////////
  if (isFieldOfficer) {
    console.log("isFieldOfficer Called");
    try {
      let fieldOfficer = await fieldOfficersCollection.findOne({
        emailAddress,
      });

      if (!fieldOfficer) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      //
      if (password != fieldOfficer.password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      //
      const payload = {
        fieldOfficer: {
          id: fieldOfficer.id,
        },
      };
      let userInfo = await fieldOfficersCollection.find({
        emaildAddress: emailAddress,
      });

      jwt.sign(payload, secret, { expiresIn: "5 days" }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          fieldOfficerData: fieldOfficer,
          message: "Congratulations! You have been successfully logged in",
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } ///////////////
  /////////////////////////////////

  if (isKabulEmployee) {
    try {
      let fieldOfficer = await kabulEmployees.findOne({
        emailAddress,
      });

      if (!fieldOfficer) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      //
      if (password != fieldOfficer.password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      //
      const payload = {
        fieldOfficer: {
          id: fieldOfficer.id,
        },
      };
      let userInfo = await fieldOfficersCollection.find({
        emaildAddress: emailAddress,
      });

      jwt.sign(payload, secret, { expiresIn: "5 days" }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          employeeData: fieldOfficer,
          message: "Congratulations! You have been successfully logged in",
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

module.exports = {
  signIn,
};
