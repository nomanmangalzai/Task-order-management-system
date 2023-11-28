const fieldOfficersCollection = require("../models/fieldOfficer.js");

const postFieldOfficer = async (req, res, next) => {
  console.log("postFieldOfficer API has been called");

  const {
    employeeId,
    employeeName,
    fatherName,
    emailAddress,
    password,
    contactNumber,
    title,
    joiningDate,
    contractDuration,
    education,
    cv,
    picture,
    certificate,
    province,
    region,
    district,
    presentAddress,
    bloodGroup,
    emergencyContactNumber,
    relationshipOfEmergencyContact,
    employeeStats,
    noOfSurveysAssigned,
    noOfSurveysCompleted,
    projectsWorked,
    gender,
  } = req.body;

  //perform checks
  const checkEmployeeSExistence = await fieldOfficersCollection.findOne({
    employeeId: employeeId,
  });

  if (checkEmployeeSExistence) {
    return res
      .status(409)
      .json({ message: "Account with the employee id already exists" });
  }

  ///
  checkName = checkEmployeeSExistence.employeeName;
  if (employeeName === checkName) {
    return res
      .status(409)
      .json({ message: "Account with this employee name already exists" });
  }

  ///
  checkEmailAddress = checkEmployeeSExistence.emailAddress;
  if (emailAddress === checkEmailAddress) {
    return res
      .status(409)
      .json({ message: "Account with this email address already exists" });
  }

  //
  checkContactNumber = checkEmployeeSExistence.contactNumber;
  if (contactNumber === checkContactNumber) {
    return res
      .status(409)
      .json({ message: "Account with this email address already exists" });
  }

  //
  //

  if (password.length <= 5) {
    return res
      .status(409)
      .json({ message: "Password has to be at least 6 characters long" });
  }

  //if no checks true then come down
  const newFieldOfficer = new fieldOfficersCollection({
    employeeId,
    employeeName,
    fatherName,
    emailAddress,
    contactNumber,
    title,
    joiningDate,
    contractDuration,
    education,
    cv,
    picture,
    certificate,
    province,
    gender,
    region,
    district,
    presentAddress,
    bloodGroup,
    emergencyContactNumber,
    relationshipOfEmergencyContact,
    employeeStats,
    noOfSurveysAssigned,
    noOfSurveysCompleted,
    projectsWorked,
    password,
  });

  const savedFieldOfficerAccount = await newFieldOfficer.save();

  //send response to frontend
  try {
    const savedFieldOfficer = await newFieldOfficer.save();
    res.status(201).json({
      success: true,
      message: "Field officer account created successfully",
      data: savedFieldOfficer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { postFieldOfficer };
