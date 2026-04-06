const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { title, description, capital, maxPercentage } = req.body;

    const project = await Project.create({
      title,
      description,
      capital,
      maxPercentage,
      owner: req.user._id, 
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROJECTS
const getProjects = async (req, res) => {
  try {
    //Project.find(): return all project
    //populate: yraje3 ownerid email o name dyalo
    const projects = await Project.find().populate("owner", "name email");

    res.json({
      count: projects.length,
      projects,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECT BY ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate("owner", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check ownership
    // compare owner de project et user who did the request if not the same user => refuse
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    // check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check ownership
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // delete project
    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };