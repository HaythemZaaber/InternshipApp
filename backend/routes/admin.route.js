const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getProfile,
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admins.controller");

const {
  getDefenseTeachers,
  getDefenseTeacher,
  createDefenseTeacher,
  updateDefenseTeacher,
  deleteDefenseTeacher,
} = require("../controllers/defenseTeachers.controller");

const { getDefense } = require("../controllers/defenses.controller");

const { getInternship } = require("../controllers/internships.controller");

const { getEnterprise } = require("../controllers/enterprises.controller");

const { getGroup } = require("../controllers/groups.controller");

const { getStudent } = require("../controllers/students.controller");

const { protect } = require("../middleware/auth.middleware");

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

router.use(protect);

router.get("/profile", getProfile);
router.get("/", getAdmins);
router.get("/:id", getAdmin);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

router
  .route("/defenseTeacher")
  .get(getDefenseTeachers)
  .post(createDefenseTeacher);
router
  .route("/defenseTeacher/:id")
  .get(getDefenseTeacher)
  .put(updateDefenseTeacher)
  .delete(deleteDefenseTeacher);

router.route("/defenseTeacher/defense/:id").get(getDefense);

router.route("/defenseTeacher/defense/internship/:id").get(getInternship);

router.route("defenseTeacher/defense/internship/group/:id").get(getGroup);

router
  .route("defenseTeacher/defense/internship/group/student/:id")
  .get(getStudent);

router
  .route("/defenseTeacher/defense/internship/enterprise/:id")
  .get(getEnterprise);

module.exports = router;
