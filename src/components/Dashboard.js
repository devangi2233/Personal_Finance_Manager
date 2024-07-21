// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';

// const Dashboard = () => {
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [categoryExpenses, setCategoryExpenses] = useState({});

//   useEffect(() => {
//     if (selectedMonth && selectedYear) {
//       calculateTotals();
//     }
//   }, [selectedMonth, selectedYear]);

//   const fetchExpenses = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/expense/getexpense', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': localStorage.getItem('token'),
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//       return [];
//     }
//   };

//   const fetchIncomes = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/income/getincome", {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': localStorage.getItem('token'),
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching incomes:', error);
//       return [];
//     }
//   };

//   const calculateTotals = async () => {
//     try {
//       const expenses = await fetchExpenses();
//       const incomes = await fetchIncomes();
  
//       const filteredExpenses = expenses.filter(expense =>
//         expense.date.includes(selectedYear) && expense.date.includes(selectedMonth)
//       );
  
//       const totalExpenseAmount = filteredExpenses.reduce((total, expense) =>
//         total + parseFloat(expense.amount), 0);

//       const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//       ];
  
//       const selectedMonthName = monthNames[parseInt(selectedMonth, 10) - 1]; 

//       const filteredIncomes = incomes.filter(income =>
//         income.year === selectedYear && income.month === selectedMonthName
//       );
  
//       const totalIncomeAmount = filteredIncomes.reduce((total, income) =>
//         total + parseFloat(income.amount), 0);

//       const categoryExpenses = filteredExpenses.reduce((totals, expense) => {
//         const { category, amount } = expense;
//         if (!totals[category]) {
//           totals[category] = 0;
//         }
//         totals[category] += parseFloat(amount);
//         return totals;
//       }, {});
  
//       setTotalIncome(totalIncomeAmount);
//       setTotalExpense(totalExpenseAmount);
//       setCategoryExpenses(categoryExpenses);
//     } catch (error) {
//       console.error('Error calculating totals:', error);
//     }
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   const handleYearChange = (e) => {
//     setSelectedYear(e.target.value);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1>Dashboard</h1>
//       <div>
//         <label>Select Month:</label>
//         <select value={selectedMonth} onChange={handleMonthChange}>
//           <option value="">-- Select Month --</option>
//           <option value="01">January</option>
//           <option value="02">February</option>
//           <option value="03">March</option>
//           <option value="04">April</option>
//           <option value="05">May</option>
//           <option value="06">June</option>
//           <option value="07">July</option>
//           <option value="08">August</option>
//           <option value="09">September</option>
//           <option value="10">October</option>
//           <option value="11">November</option>
//           <option value="12">December</option>
//         </select>
//         <label>Select Year:</label>
//         <select value={selectedYear} onChange={handleYearChange}>
//           {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <h2>Total Income: {totalIncome}</h2>
//         <h2>Total Expense: {totalExpense}</h2>
//         <h3>Category-wise Expenses:</h3>
//         <ul>
//           {Object.keys(categoryExpenses).map(category => (
//             <li key={category}>{category}: {categoryExpenses[category]}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Navbar from './Navbar';
import 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title  } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryExpenses, setCategoryExpenses] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      calculateTotals();
    }
  }, [selectedMonth, selectedYear]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expense/getexpense', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return [];
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/income/getincome", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching incomes:', error);
      return [];
    }
  };

  const calculateTotals = async () => {
    try {
      const expenses = await fetchExpenses();
      const incomes = await fetchIncomes();
  
      const filteredExpenses = expenses.filter(expense =>
        expense.date.includes(selectedYear) && expense.date.includes(selectedMonth)
      );
  
      const totalExpenseAmount = filteredExpenses.reduce((total, expense) =>
        total + parseFloat(expense.amount), 0);

      const categoryTotals = filteredExpenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += parseFloat(amount);
        return acc;
      }, {});

      const categoryDetails = filteredExpenses.reduce((acc, expense) => {
        const { category, title, amount } = expense;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ title, amount });
        return acc;
      }, {});

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
      const selectedMonthName = monthNames[parseInt(selectedMonth, 10) - 1]; 

      const filteredIncomes = incomes.filter(income =>
        income.year === selectedYear && income.month === selectedMonthName
      );
  
      const totalIncomeAmount = filteredIncomes.reduce((total, income) =>
        total + parseFloat(income.amount), 0);

      setTotalIncome(totalIncomeAmount);
      setTotalExpense(totalExpenseAmount);
      setCategoryExpenses(categoryTotals);
      setCategoryDetails(categoryDetails);
    } catch (error) {
      console.error('Error calculating totals:', error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };


  const calculatePercentages = () => {
    const percentages = {};
    Object.keys(categoryExpenses).forEach(category => {
      const percentage = ((categoryExpenses[category] / totalIncome) * 100).toFixed(2);
      percentages[category] = percentage;
    });
    return percentages;
  };
  
  const pieData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryExpenses),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const category = context.label;
            const percentage = calculatePercentages()[category];
            return `${category}: ${percentage}%`;
          }
        }
      },
      legend: {
        position: 'right',
      }
    }
  };


  
  const barData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(categoryExpenses),
        backgroundColor: Object.keys(categoryExpenses).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`),
        borderColor: Object.keys(categoryExpenses).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
      }
    ],
  };

  const barOptions = {
    indexAxis: 'y',  // This makes the chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: totalIncome,
        ticks: {
          stepSize: 5000,
          callback: function(value) {
            return value.toLocaleString(); // Format number with commas
          }
        },
        title: {
          display: true,
          text: 'Amount',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const category = context.label;
            const details = categoryDetails[category];
            return details.map(detail => `${detail.title}: ${detail.amount}`).join('\n');
          }
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <div>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">-- Select Month --</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <label>Select Year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {selectedMonth && selectedYear && (
        <>
          <div>
            <h2>Total Income: {totalIncome}</h2>
            <h2>Total Expense: {totalExpense}</h2>
          </div>
          <div>
            <h2>Expenses by Category</h2>
            <div style={{ width: '300px', height: '300px' }}>
            <Pie data={pieData} options={pieOptions}/>
            </div>
          </div>
          <div>
            <h2>Income Vs Expense</h2>
            <div style={{ width: '600px', height: '300px' }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
