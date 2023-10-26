const Teacher = require("../models/teacher.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const validator = require("validator");

const registerTeacher = async (req, res) => {
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
  const teacherExists = await Teacher.findOne({ email });
  if (teacherExists) {
    return res.status(400).json({ error: "Teacher exists!" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Teacher
  const teacher = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });


  if (teacher) {
    return res.status(201).json({
      _id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      token: generateToken(teacher.id),
    });
  } else {
    return res.status(400).json({ error: "Invalid teacher data" });
  }
};

const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  // Check for teacher email
  const teacher = await Teacher.findOne({
    email,
  });

  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    return res.status(201).json({
      _id: teacher.id,
      email: teacher.email,
      token: generateToken(teacher.id),
    });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getProfile = async (req, res) => {
  const { _id, name, email } = await Teacher.findById(req.user.id);

  return res.json({
    id: _id,
    name,
    email,
  });
};

const getTeachers = async (req, res) => {
  const teachers = await Teacher.find();

  return res.json({ teachers });
};

const getTeacher = async (req, res) => {
  const teacherId = req.params.id;

  const teacher = await Teacher.findById(teacherId);

  res.json({ teacher });
};

const createTeacher = async (req, res) => {
  //Get the sent in data off request body
  const { CIN, name, address_mail, password, picture, admin } = req.body;
  // Create a teacher with it
  const teacher = await Teacher.create({
    CIN,
    name,
    address_mail,
    password,
    picture,
    admin,
  });

  //respond with the new
  res.json({ teacher });
};

const updateTeacher = async (req, res) => {
  const teacherId = req.params.id;

  //Get the sent in data off request body
  const { CIN, name, address_mail, password, picture, admin } = req.body;
  // Create a teacher with it
  const teacher = await Teacher.findByIdAndUpdate(
    teacherId,
    {
      CIN,
      name,
      address_mail,
      password,
      picture,
      admin,
    },
    { new: 1 }
  );

  //respond with the new
  res.json({ teacher });
};

const deleteTeacher = async (req, res) => {
  const teacherId = req.params.id;

  // delete a teacher with it
  await Teacher.deleteOne({ _id: teacherId });

  //respond with success message
  res.json({ message: "teacher deleted successfully" });
};

module.exports = {
  registerTeacher,
  loginTeacher,
  getProfile,
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
