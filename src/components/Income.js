import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const years = Array.from(new Array(50), (val, index) => new Date().getFullYear() - index);

const Income = () => {
  const [incomeData, setIncomeData] = useState({ source: "", amount: "", month: "", year: "" });
  const [incomes, setIncomes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/income/getincome", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (incomeData.source && incomeData.amount && incomeData.month && incomeData.year) {
      try {
        let response;
        if (editMode && editId) {
          // Update existing income
          response = await fetch(`http://localhost:5000/api/income/updateincome/${editId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(incomeData),
          });
        } else {
          // Add new income
          response = await fetch("http://localhost:5000/api/income/addincome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(incomeData),
          });
        }
        const newIncome = await response.json();
        setIncomes((prevIncomes) => {
          if (editMode && editId) {
            // Replace edited income in incomes list
            return prevIncomes.map((income) =>
              income._id === editId ? newIncome : income
            );
          } else {
            // Add new income to incomes list
            return [...prevIncomes, newIncome];
          }
        });
        setIncomeData({ source: "", amount: "", month: "", year: "" });
        setEditMode(false);
        setEditId(null);
      } catch (error) {
        console.error("Error adding/editing income:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/income/deleteincome/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      console.log(json);
      const newIncome = incomes.filter((income) => {
        return income._id !== id;
      });
      setIncomes(newIncome);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleEdit = (income) => {
    setIncomeData({
      source: income.source,
      amount: income.amount,
      month: income.month,
      year: income.year,
    });
    setEditMode(true);
    setEditId(income._id);
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  };

  return (
    <div>
      <Navbar />
      <form className="container my-5" onSubmit={onSubmit}>
        <h1>{editMode ? "Edit Income" : "Add Income"}</h1>
        <div className="mb-3">
          <label htmlFor="source" className="form-label">
            Source
          </label>
          <input
            type="text"
            className="form-control"
            id="source"
            name="source"
            value={incomeData.source}
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
            value={incomeData.amount}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="month" className="form-label">
            Month
          </label>
          <select
            className="form-control"
            id="month"
            name="month"
            value={incomeData.month}
            onChange={onChange}
          >
            <option value="" disabled>Select month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <select
            className="form-control"
            id="year"
            name="year"
            value={incomeData.year}
            onChange={onChange}
          >
            <option value="" disabled>Select year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editMode ? "Update" : "Add"}
        </button>
      </form>

      <h1 className="container">Income Table</h1>
      <table className="table table-success table-striped container my-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Source</th>
            <th scope="col">Amount</th>
            <th scope="col">Month</th>
            <th scope="col">Year</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => (
            <tr key={income._id}>
              <td>{index + 1}</td>
              <td>{income.source}</td>
              <td>{income.amount}</td>
              <td>{income.month}</td>
              <td>{income.year}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(income._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => handleEdit(income)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"><strong>Total Income</strong></td>
            <td colSpan="3"><strong>{calculateTotalIncome()}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Income;
