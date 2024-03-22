const express = require("express");
const router = express.Router();

//import controllers
const {
  registerTeacher,
  loginTeacher,
  getProfile,
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers.controller");

const {
  getDefenseTeachers,
  getDefenseTeacher,
} = require("../controllers/defenseTeachers.controller");

const {
  getDefense,
}= require("../controllers/defenses.controller")

const {
  getInternship
} = require("../controllers/internships.controller")

const {
  getEnterprise
} = require("../controllers/enterprises.controller")

const {
  getGroup
} = require("../controllers/groups.controller")

const {
  getStudent
} = require("../controllers/students.controller")
  
const { protect } = require("../middleware/auth.middleware");

router.route("/register").post(registerTeacher);
router.route("/login").post(loginTeacher);

router.use(protect);

router.get("/", getTeachers);

router.get("/:id", getTeacher);

router.post("/", createTeacher);

router.put("/:id", updateTeacher);

router.delete("/:id", deleteTeacher);

router.get("/profile", getProfile);

router.route("/defenseTeacher").get(getDefenseTeachers);
router.route("/defenseTeacher/:id").get(getDefenseTeacher);

router.route("/defenseTeacher/defense/:id").get(getDefense);

router.route("/defenseTeacher/defense/internship/:id").get(getInternship);

router.route("defenseTeacher/defense/internship/group/:id").get(getGroup)

router
  .route("defenseTeacher/defense/internship/group/student/:id")
  .get(getStudent);
  
  router.route("/defenseTeacher/defense/internship/enterprise/:id").get(getEnterprise);


module.exports = router;