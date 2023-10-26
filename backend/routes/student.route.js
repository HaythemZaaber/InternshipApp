const express = require("express");
const router = express.Router();

const {
  registerStudent,
  getProfile,
  loginStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/students.controller");

const {
  getDemands,
  getDemandById,
  createDemand,
  deleteDemand,
  updateDemand,
} = require("../controllers/demand.controller");

const {
  getInternships,
  getInternship,
  createInternship,
  deleteInternship,
  updateInternship,
} = require("../controllers/internships.controller");

const {
  getGroup,
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groups.controller");

const {
  getEnterprises,
  getEnterprise,
  createEnterprise,
  updateEnterprise,
  deleteEnterprise,
} = require("../controllers/enterprises.controller");

const {
  getDefenses,
  getDefense,
} = require("../controllers/defenses.controller");

const { protect } = require("../middleware/auth.middleware");

router.route("/register").post(registerStudent);
router.route("/login").post(loginStudent);

router.use(protect);

router.get("/user", getProfile);

router.get("/", getStudents);
router.get("/:id", getStudent);
router.put("/", updateStudent); //update student details by id and token
router.delete("/", deleteStudent); //delete a single student from the database using their ID and Token

router.route("/demand").get(getDemands).post(createDemand);
router
  .route("/demand/:id")
  .get(getDemandById)
  .put(updateDemand)
  .delete(deleteDemand);

router.route("/internship").get(getInternships).post(createInternship);
router
  .route("/internship/:id")
  .get(getInternship)
  .put(updateInternship)
  .delete(deleteInternship);

router.route("/intership/group").get(getGroups).post(createGroup);
router
  .route("/intership/group/:id")
  .get(getGroup)
  .put(updateGroup)
  .delete(deleteGroup);

router
  .route("/intership/enterprise")
  .get(getEnterprises)
  .post(createEnterprise);
router
  .route("/intership/enterprise")
  .get(getEnterprise)
  .put(updateEnterprise)
  .delete(deleteEnterprise);

router.route("/intership/defense").get(getDefenses);
router.route("/intership/defense/:id").get(getDefense);

module.exports = router;
