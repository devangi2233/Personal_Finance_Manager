// const express = require("express");
// const router = express.Router();
// const Income = require("../models/Income");
// const auth = require("../middleware/auth");

// // Get incomes for the logged-in user
// router.get("/getincome", auth, async (req, res) => {
//   try {
//     const incomes = await Income.find({ user: req.user.id });
//     res.json(incomes);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });



// router.post(
//   "/addincome",
//   auth,
//   async (req, res) => {
//     try {
//       const { source, amount } = req.body;

//       const income = new Income({
//         source,
//         amount,
//         user: req.user.id,
//       });

//       const saveIncome = await income.save();

//       res.json(saveIncome);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Some error occured");
//     }
//   }
// );

// // Delete an income
// router.delete("/deleteincome/:id", auth, async (req, res) => {
//   try {
//     let income = await Income.findById(req.params.id);
//     if (!income) {
//       return res.status(404).json({ message: "Income not found" });
//     }

//     // Check if the logged-in user is the owner of the income
//     if (income.user.toString() !== req.user.id) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     income = await Income.findByIdAndDelete(req.params.id)
    
//     res.json({ message: "Income deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// //update income

// router.put("/updateincome/:id", auth, async (req, res) => {
//   try {
//     const { source, amount } = req.body;

//     //create a new note object
//     const newIncome = {};
//     if (source) {
//       newIncome.source = source;
//     }
//     if (amount) {
//       newIncome.amount = amount;
//     }

//     //Find the note to be updated
//     let income = await Income.findById(req.params.id);
//     if (!income) {
//       return res.status(404).send("Not Found");
//     }

//     if (income.user.toString() !== req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }

//     income = await Income.findByIdAndUpdate(
//       req.params.id,
//       { $set: newIncome },
//       { new: true }
//     );

//     res.json(income);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Some error occured");
//   }
// });


// module.exports = router;



const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const auth = require("../middleware/auth");

// Get incomes for the logged-in user
router.get("/getincome", auth, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new income
router.post("/addincome", auth, async (req, res) => {
  const { source, amount, month, year } = req.body;

  if (!source || !amount || !month || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const income = new Income({
      source,
      amount,
      month,
      year,
      user: req.user.id,
    });

    const saveIncome = await income.save();
    res.json(saveIncome);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

// Delete an income
router.delete("/deleteincome/:id", auth, async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Check if the logged-in user is the owner of the income
    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an income
router.put("/updateincome/:id", auth, async (req, res) => {
  const { source, amount, month, year } = req.body;

  if (!source || !amount || !month || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newIncome = { source, amount, month, year };

    let income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).send("Not Found");
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    income = await Income.findByIdAndUpdate(
      req.params.id,
      { $set: newIncome },
      { new: true }
    );

    res.json(income);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});






module.exports = router;
