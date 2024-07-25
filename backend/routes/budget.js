const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new budget
router.post("/", async (req, res) => {
  const budget = new Budget({
    category: req.body.category,
    amount: req.body.amount,
    percentage: req.body.percentage,
  });

  try {
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a budget
router.put("/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(budget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    await Budget.findByIdAndRemove(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
