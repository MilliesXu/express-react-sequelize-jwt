const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const sequelize = require("sequelize");

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findAll({ where: { user_id: req.user.id } });
  res.status(200).json(goals);
});

// @desc    Set Goals
// @route   Post /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Text is required");
  }

  const goals = await Goal.create({
    text: req.body.text,
    user_id: req.user.id,
  });

  res.status(200).json({ message: "Successfully create goal" });
});

// @desc    Update Goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (goal.length === 0) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (goal.user_id !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  await Goal.update({ text: req.body.text }, { where: { id: req.params.id } });

  res.status(200).json({ message: `Updated goals` });
});

// @desc    Delete Goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (goal.length === 0) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (goal.user_id !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  await Goal.destroy({ where: { id: req.params.id } });

  res.status(200).json({ message: `Delete goals ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
