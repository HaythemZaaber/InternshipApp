const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const validator = require("validator");
const multer = require("multer");
const path = require("path");

const registerStudent = async (req, res) => {
  const { cin, email, password } = req.body;
  // Check if the fields are empty or not
  if (!cin || !email || !password) {
    return res.status(400).json({ error: "Please add all fields" });
  }
  // cin validation
  if (!validator.isNumeric(cin) || cin.length !== 8) {
    return res.status(400).json({ error: "cin is not valid" });
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

  // parse the cin to a number
  const cinNumber = parseInt(cin);
  const studentExist = await Student.findOne({ CIN: cinNumber });
  if (!studentExist) {
    return res.status(400).json({ error: "student doesn't exists!" });
  }

  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).json({ error: "Student exists!" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Student
  const student = await Student.findOneAndUpdate(
    { CIN: cin },
    {
      email,
      password: hashedPassword,
    }
  );

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

  console.log(student);
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
  // const studentId = req.params.id;
  // const student = await Student.findById(studentId);
  // if (!student) {
  //   res.status(404).json({ error: "No such student" });
  // }

  const user = await Student.findById(req.user.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  // if (user.id !== student._id.toString()) {
  //   res.status(400).json({ error: "Not authorized to edit this student" });
  // }

  //Get the sent in data off request body
  const {
    study,
    phoneNumber,
    group,
    CIN,
    name,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
    secondPhoneNumber,
    linkedIn,
    birthday,
    address,
  } = req.body;
  var password;
  if (currentPassword && newPassword && confirmNewPassword) {
    if (await bcrypt.compare(currentPassword, user.password)) {
      if (newPassword === confirmNewPassword) {
        // hash password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(newPassword, salt);
        // password = newPassword;
      } else {
        return res.status(400).json({ error: "Confirm your new password" });
      }
    } else {
      return res.status(400).json({ error: "The Current password is wrong" });
    }
  } else if (!currentPassword && !newPassword && !confirmNewPassword) {
    password = user.password;
  } else {
    return res
      .status(400)
      .json({ error: "Please fill all the fields to change your password" });
  }

  // Create a student with it
  const updatedStudent = await Student.findByIdAndUpdate(
    user,
    {
      study,
      phoneNumber,
      group,
      CIN,
      name,
      email,
      password,
      secondPhoneNumber,
      linkedIn,
      birthday,
      address,
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

// implement the multer and diskStorage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
    // cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage }).single("file");

const createStudentWithImage = asyncHandler(async (req, res) => {
  console.log(req.file);
  const {
    study,
    phoneNumber,
    group,
    CIN,
    name,
    email,
    password,
    secondPhoneNumber,
    birthday,
    linkedIn,
    address,
  } = req.body;
  const picture = req.file.filename;
  const student = await Student.create({
    study,
    phoneNumber,
    group,
    CIN,
    name,
    email,
    password,
    picture,
    secondPhoneNumber,
    birthday,
    linkedIn,
    address,
  });
  res.json({ student });
});
// exports.createStudentWithImage = asyncHandler(async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ error: err });
//     } else {
//       console.log(req.file)
//       const { study, phoneNumber, group, CIN, name, email, password } = req.body;
//       const picture = req.file.filename;
//       const student = await Student.create({
//         study,
//         phoneNumber,
//         group,
//         CIN,
//         name,
//         email,
//         password,
//         picture,
//       });
//       res.json({ student });
//     }
//   });
// }
// );

const updateStudentPicture = async (req, res) => {
  console.log(req.file);
  let user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const student = await Student.findById(user.id);
  if (!student) {
    res.status(404);
    throw new Error("No such student");
  }
  if (student.id !== user.id) {
    res.status(400);
    throw new Error("Not authorized to edit this student");
  }

  try {
    const picture = req.file.filename;
    const student = await Student.findByIdAndUpdate(
      user.id,
      {
        picture,
      },
      { new: 1 }
    );
    res.json({ student, timestamp: Date.now() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
// const updateStudentPicture = asyncHandler(async (req, res, next) => {
//   const user = req.user;

//   try {
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const student = await Student.findById(user.id);
//     if (!student) {
//       throw new Error("No such student");
//     }
//     console.log(user.id);
//     console.log(student.id);

//     // Adjust the comparison based on your data model
//     if (student._id.toString() !== user.id) {
//       throw new Error("Not authorized to edit this student");
//     }

//     upload(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return next(err); // Use next to pass the error to the error-handling middleware
//       }

//       const picture = req.file.filename;
//       const updatedStudent = await Student.findByIdAndUpdate(
//         user.id,
//         { picture },
//         { new: true } // Return the updated document
//       );

//       res.json({ student: updatedStudent });
//     });
//   } catch (error) {
//     console.error(error.message);
//     return next(error);
//   }
// });

module.exports = {
  registerStudent,
  loginStudent,
  getProfile,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  upload,
  createStudentWithImage,
  updateStudentPicture,
};
