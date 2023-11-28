const mongoose = require("mongoose");

const fieldOfficerSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    // required: true,
  },
  employeeName: {
    type: String,
    // required: true,
  },
  fatherName: String,
  emailAddress: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
  },
  contactNumber: {
    type: String,
    // required: true,
  },
  title: String,
  joiningDate: {
    type: Date,
    // required: true,
  },
  contractDuration: String,
  education: String,
  cv: String, // Assuming you store the PDF file path or URL
  picture: String, // Assuming you store the image file path or URL
  certificate: String, // Assuming you store the certificate file path or URL
  province: String,
  region: String,
  district: String,

  presentAddress: String,
  bloodGroup: String,
  emergencyContactNumber: String,
  relationshipOfEmergencyContact: String,
  employeeStats: {
    type: Boolean,
    enum: [true, false],
  },
  noOfSurveysAssigned: Number,
  noOfSurveysCompleted: Number,
  projectsWorked: {
    type: [String],
    default: [],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

const fieldOfficer = mongoose.model("fieldOfficer", fieldOfficerSchema);

module.exports = fieldOfficer;
