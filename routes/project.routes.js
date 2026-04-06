const express = require("express");
const router = express.Router();

const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/project.controller");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// create project (owner only)
router.post("/", protect, authorize("owner"), createProject);

//get all projects
router.get("/", protect, getProjects);

//get byId
router.get("/:id", protect, getProjectById);

//update
router.put("/:id", protect, authorize("owner"), updateProject);

//delete
router.delete("/:id", protect, authorize("owner"), deleteProject);

module.exports = router;