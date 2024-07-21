// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";

// const Expense = () => {
//   const [expenseData, setExpenseData] = useState({ category: "", amount: "" });
//   const [expenses, setExpenses] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/expense/getexpense",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         }
//       );
//       const data = await response.json();
//       setExpenses(data);
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//     }
//   };

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setExpenseData({ ...expenseData, [name]: value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (expenseData.category && expenseData.amount) {
//       try {
//         let response;
//         if (editMode && editId) {
//           // Update existing expense
//           response = await fetch(
//             `http://localhost:5000/api/expense/updateexpense/${editId}`,
//             {
//               method: "PUT",
//               headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": localStorage.getItem("token"),
//               },
//               body: JSON.stringify(expenseData),
//             }
//           );
//         } else {
//           // Add new expense
//           response = await fetch(
//             "http://localhost:5000/api/expense/addexpense",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": localStorage.getItem("token"),
//               },
//               body: JSON.stringify(expenseData),
//             }
//           );
//         }
//         const newExpense = await response.json();
//         setExpenses((prevExpenses) => {
//           if (editMode && editId) {
//             // Replace edited expense in expenses list
//             return prevExpenses.map((expense) =>
//               expense._id === editId ? newExpense : expense
//             );
//           } else {
//             // Add new expense to expenses list
//             return [...prevExpenses, newExpense];
//           }
//         });
//         setExpenseData({ category: "", amount: "" });
//         setEditMode(false);
//         setEditId(null);
//       } catch (error) {
//         console.error("Error adding/editing expense:", error);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:5000/api/expense/deleteexpense/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": token,
//           },
//         }
//       );
//       const json = await response.json();
//       console.log(json);
//       const newExpense = expenses.filter((expense) => {
//         return expense._id !== id;
//       });
//       setExpenses(newExpense);
//     } catch (error) {
//       console.error("Error deleting expense:", error);
//     }
//   };

//   const handleEdit = (expense) => {
//     setExpenseData({
//       category: expense.category,
//       amount: expense.amount,
//     });
//     setEditMode(true);
//     setEditId(expense._id);
//   };

//   const calculateTotalExpense = () => {
//     return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
//   };
//   return (
//     <div>
//       <Navbar />
//       <form className="container my-5" onSubmit={onSubmit}>
//         <h1>{editMode ? "Edit Expense" : "Add Expense"}</h1>
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">
//             Category
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="category"
//             name="category"
//             value={expenseData.category}
//             onChange={onChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="amount" className="form-label">
//             Amount
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="amount"
//             name="amount"
//             value={expenseData.amount}
//             onChange={onChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {editMode ? "Update" : "Add"}
//         </button>
//       </form>

//       <h1 className="container">Expense Table</h1>
//       <table className="table table-success table-striped container my-3">
//         <thead>
//           <tr>
//             <th scope="col">Id</th>
//             <th scope="col">Category</th>
//             <th scope="col">Amount</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense, index) => (
//             <tr key={expense._id}>
//               <td>{index + 1}</td>
//               <td>{expense.category}</td>
//               <td>{expense.amount}</td>
//               <td>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(expense._id)}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="btn btn-warning mx-2"
//                   onClick={() => handleEdit(expense)}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//            <tr>
//             <td colSpan="2"><strong>Total Expense</strong></td>
//             <td><strong>{calculateTotalExpense()}</strong></td>
//             <td></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Expense;


// components/Expense.js



import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const categories = ["Food", "Transportation", "Accommodation", "Personal"];

const Expense = () => {
  const [expenseData, setExpenseData] = useState({ category: "", title: "", amount: "", date: "" });
  const [expenses, setExpenses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/expense/getexpense", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (expenseData.category && expenseData.title && expenseData.amount) {
      try {
        let response;
        if (editMode && editId) {
          response = await fetch(`http://localhost:5000/api/expense/updateexpense/${editId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(expenseData),
          });
        } else {
          response = await fetch("http://localhost:5000/api/expense/addexpense", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(expenseData),
          });
        }
        const newExpense = await response.json();
        setExpenses((prevExpenses) => {
          if (editMode && editId) {
            return prevExpenses.map((expense) => (expense._id === editId ? newExpense : expense));
          } else {
            return [...prevExpenses, newExpense];
          }
        });
        setExpenseData({ category: "", title: "", amount: "", date: "" });
        setEditMode(false);
        setEditId(null);
        setExpandedCategory(null);
      } catch (error) {
        console.error("Error adding/editing expense:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/expense/deleteexpense/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      console.log(json);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setExpenseData({
      category: expense.category,
      title: expense.title,
      amount: expense.amount,
      date: expense.date ? expense.date.split("T")[0] : "", // If date exists, format it for the input field
    });
    setEditMode(true);
    setEditId(expense._id);
    setExpandedCategory(expense.category);
  };

  const calculateTotalExpense = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    if (expandedCategory !== category) {
      setExpenseData({ category, title: "", amount: "", date: "" });
    }
  };

  return (
    <div>
      <Navbar />
      {categories.map((category) => (
        <div key={category} className="container my-3">
          <div className="d-flex justify-content-between align-items-center p-3 border">
            <h3>{category}</h3>
            <button className="btn btn-primary" onClick={() => toggleCategory(category)}>
              {expandedCategory === category ? "-" : "+"}
            </button>
          </div>
          {expandedCategory === category && (
            <form className="my-3" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={expenseData.title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={expenseData.amount}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={expenseData.date}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editMode ? "Update" : "Add"}
              </button>
            </form>
          )}
        </div>
      ))}
      <div className="container my-5">
        <h1>Expense Table</h1>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Category</th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{index + 1}</td>
                <td>{expense.category}</td>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(expense._id)}>
                    Delete
                  </button>
                  <button className="btn btn-warning mx-2" onClick={() => handleEdit(expense)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">
                <strong>Total Expense</strong>
              </td>
              <td>
                <strong>{calculateTotalExpense()}</strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expense;
