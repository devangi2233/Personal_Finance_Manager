import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Budget = () => {
  const [budgetData, setBudgetData] = useState({ category: "", amount: "", percentage: "" });
  const [budgets, setBudgets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBudgetId, setCurrentBudgetId] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/budget");
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (budgetData.category && budgetData.amount && budgetData.percentage) {
      try {
        if (isEditing) {
          const response = await fetch(`http://localhost:5000/api/budget/${currentBudgetId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(budgetData),
          });
          const updatedBudget = await response.json();
          setBudgets(budgets.map((budget) => (budget._id === currentBudgetId ? updatedBudget : budget)));
          setIsEditing(false);
          setCurrentBudgetId(null);
        } else {
          const response = await fetch("http://localhost:5000/api/budget", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(budgetData),
          });
          const newBudget = await response.json();
          setBudgets([...budgets, newBudget]);
        }
        setBudgetData({ category: "", amount: "", percentage: "" });
      } catch (error) {
        console.error("Error saving budget:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/budget/${id}`, {
        method: "DELETE",
      });
      setBudgets(budgets.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const handleEdit = (budget) => {
    setIsEditing(true);
    setCurrentBudgetId(budget._id);
    setBudgetData({ category: budget.category, amount: budget.amount, percentage: budget.percentage });
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={onSubmit}>
              <h1>{isEditing ? "Edit Budget" : "Set Budget"}</h1>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={budgetData.category}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={budgetData.amount}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="percentage" className="form-label">
                  Percentage
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="percentage"
                  name="percentage"
                  value={budgetData.percentage}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {isEditing ? "Update" : "Save"}
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h1>Budget Overview</h1>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => (
                  <tr key={budget._id}>
                    <td>{budget.category}</td>
                    <td>{budget.amount}</td>
                    <td>{budget.percentage}%</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleEdit(budget)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(budget._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
