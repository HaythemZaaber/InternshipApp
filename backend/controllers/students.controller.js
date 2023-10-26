const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const validator = require("validator");

const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  // Check if the fields are empty or not
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please add all fields" });
  }
  // email validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  // password validation
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }
  // search for the student by the entered email
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).json({ error: "Student exists!" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Student
  const student = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

  if (student) {
    return res.status(201).json({
      _id: student.id,
      name: student.name,
      email: student.email,
      token: generateToken(student.id),
    });
  } else {
    return res.status(400).json({ error: "Invalid student data" });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  // Check for student email
  const student = await Student.findOne({
    email,
  });

  console.log(student)
  if (student && (await bcrypt.compare(password, student.password))) {
    return res.status(201).json({
      _id: student.id,
      email: student.email,
      token: generateToken(student.id),
    });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getProfile = asyncHandler(async (req, res) => {
  const studentProfile = await Student.findById(req.user.id);

  res.json({ studentProfile });
});

const getStudents = async (req, res) => {
  const student = await Student.find();

  res.json({ student });
};

const getStudent = async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findById(studentId);

  res.json({ student });
};

const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404).json({ error: "No such student" });
  }

  const user = await Student.findById(req.user.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  if (user.id !== student._id.toString()) {
    res.status(400).json({ error: "Not authorized to edit this student" });
  }

  //Get the sent in data off request body
  const { study, phone, group, CIN, name, email, password, picture } = req.body;
  // Create a student with it
  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    {
      study,
      phone,
      group,
      CIN,
      name,
      email,
      password,
      picture,
    },
    { new: 1 }
  );

  //respond with the new
  res.json({ updatedStudent });
};

const deleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("No such student");
  }

  const user = await Student.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.id !== student._id.toString()) {
    res.status(400);
    throw new Error("Not authorized to edit this student");
  }

  // delete a student with it
  await Student.deleteOne({ _id: studentId });

  //respond with success message
  res.json({ message: "student deleted successfully" });
});

module.exports = {
  registerStudent,
  loginStudent,
  getProfile,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
