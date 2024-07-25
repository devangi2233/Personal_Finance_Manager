
// // routes/expense.js

// const express = require("express");
// const router = express.Router();
// const Expense = require("../models/Expense");
// const auth = require("../middleware/auth");

// // Get expenses for the logged-in user
// router.get("/getexpense", auth, async (req, res) => {
//   try {
//     const expenses = await Expense.find({ user: req.user.id });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });



// router.post(
//   "/addexpense",
//   auth,
//   async (req, res) => {
//     try {
//       const { category, amount } = req.body;

//       const expense = new Expense({
//         category,
//         amount,
//         user: req.user.id,
//       });

//       const saveExpense = await expense.save();

//       res.json(saveExpense);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Some error occured");
//     }
//   }
// );

// // Delete an expense
// router.delete("/deleteexpense/:id", auth, async (req, res) => {
//   try {
//     let expense = await Expense.findById(req.params.id);
//     if (!expense) {
//       return res.status(404).json({ message: "Expense not found" });
//     }

//     // Check if the logged-in user is the owner of the expense
//     if (expense.user.toString() !== req.user.id) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     expense = await Expense.findByIdAndDelete(req.params.id)
    
//     res.json({ message: "Expense deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// //update expense

// router.put("/updateexpense/:id", auth, async (req, res) => {
//   try {
//     const { category, amount } = req.body;

//     //create a new note object
//     const newExpense = {};
//     if (category) {
//       newExpense.category = category;
//     }
//     if (amount) {
//       newExpense.amount = amount;
//     }

//     //Find the note to be updated
//     let expense = await Expense.findById(req.params.id);
//     if (!expense) {
//       return res.status(404).send("Not Found");
//     }

//     if (expense.user.toString() !== req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }

//     expense = await Expense.findByIdAndUpdate(
//       req.params.id,
//       { $set: newExpense },
//       { new: true }
//     );

//     res.json(expense);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Some error occured");
//   }
// });


// module.exports = router;





const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// Get expenses for the logged-in user
router.get("/getexpense", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new expense
router.post("/addexpense", auth, async (req, res) => {
  const { category, title, amount, date } = req.body;

  if (!category || !title || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const expense = new Expense({
      category,
      title,
      amount,
      date: date || Date.now(), // Set the current date if not provided
      user: req.user.id,
    });

    const saveExpense = await expense.save();
    res.json(saveExpense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

// Delete an expense
router.delete("/deleteexpense/:id", auth, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check if the logged-in user is the owner of the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an expense
router.put("/updateexpense/:id", auth, async (req, res) => {
  const { category, title, amount, date } = req.body;

  if (!category || !title || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newExpense = {
      category,
      title,
      amount,
      date: date || Date.now(), // Update the date if provided, otherwise keep current
    };

    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send("Not Found");
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: newExpense },
      { new: true }
    );

    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

module.exports = router;
