const Project = require("../models/Project");
const Investment = require("../models/investment");
const User = require("../models/User");

const invest = async (req, res) => {
  try {
    const { projectId, amount } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status !== "open") {
      return res.status(400).json({ message: "Project is closed" });
    }

    const investor = await User.findById(req.user._id);

    if (investor.balance < amount) {
      return res.status(400).json({ message: "Not enough balance" });
    }

    const maxAllowed = project.capital * 0.5;
    if (amount > maxAllowed) {
      return res.status(400).json({ message: "Max 50% exceeded" });
    }

    const remaining = project.capital - project.currentAmount;
    if (amount > remaining) {
      return res.status(400).json({ message: "Amount exceeds remaining capital" });
    }

    const percentage = (amount / project.capital) * 100;

    await Investment.create({
      investorId: investor._id,
      projectId,
      amount,
      percentage
    });

    investor.balance -= amount;
    await investor.save();

    project.currentAmount += amount;

    if (project.currentAmount >= project.capital) {
      project.status = "closed";
    }

    await project.save();

    res.json({
      message: "Investment successful",
      wallet: investor.balance,
      projectRaised: project.currentAmount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { invest };