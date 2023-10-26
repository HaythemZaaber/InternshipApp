const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const validator = require("validator");

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  // Check if the fields are empty or not
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please add all fields" });
  }
  // email validation
  if (!validator.isEmail(email)) {
  res.status(400).json({ error: "Email is not valid" });
  }
  // password validation
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({ error: "Password not strong enough" });
  }
  // search for the student by the entered email
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400).json({ error: "Admin exists!" });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    return res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check for admin email
  const admin = await Admin.findOne({
    email,
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    return res.status(201).json({
      _id: admin.id,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    return res.status(400).json({error:"Invalid credentials"});
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getProfile = asyncHandler(async (req, res) => {
  // this controller will be executed after the "protect" middlware that extracts the infos from the token sent with the request
  const { _id, name, email } = await Admin.findById(req.user.id);

  res.json({
    id: _id,
    name,
    email,
  });
});

const getAdmins = async (req, res) => {
  const admin = await Admin.find();

  res.json({ admin });
};

const getAdmin = async (req, res) => {
  const adminId = req.params.id;

  const admin = await Admin.findById(adminId);

  res.json({ admin });
};

const createAdmin = async (req, res) => {
  //Get the sent in data off request body
  const { CIN, name, address_mail, password, picture } = req.body;
  // Create a admin with it
  const admin = await Admin.create({
    CIN,
    name,
    address_mail,
    password,
    picture,
  });

  //respond with the new
  res.json({ admin });
};

const updateAdmin = async (req, res) => {
  const adminId = req.params.id;

  //   verifying if the admin sending the request is the same who will be updated
  if (adminId != req.user.id) {
    res.status(401);
    throw new Error("You are not allowed to update this admin");
  }

  //Get the sent in data off request body
  const { CIN, name, address_mail, password, picture } = req.body;
  // Create a admin with it
  const admin = await Admin.findByIdAndUpdate(
    adminId,
    {
      CIN,
      name,
      address_mail,
      password,
      picture,
    },
    { new: 1 }
  );

  //respond with the new
  res.json({ admin });
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  //   verifying that it is the same admin who is deleting his profile
  if (adminId != req.user.id) {
    res.status(401);
    throw new Error("You are not allowed to delete this account");
  }

  // delete a admin with it
  await Admin.deleteOne({ _id: adminId });

  //respond with success message
  res.json({ message: "admin deleted successfully" });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getProfile,
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
