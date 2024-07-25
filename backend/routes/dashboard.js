const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const auth = require('../middleware/auth');

// Get total income and expense for a selected month
router.get('/dashboard/:month/:year', auth, async (req, res) => {
  const { month, year } = req.params;
  const userId = req.user.id;

  try {
    const totalIncome = await Income.aggregate([
      { $match: { user: userId, month, year } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { user: userId, date: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-31`) } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({ totalIncome: totalIncome.length > 0 ? totalIncome[0].total : 0, totalExpense: totalExpense.length > 0 ? totalExpense[0].total : 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
