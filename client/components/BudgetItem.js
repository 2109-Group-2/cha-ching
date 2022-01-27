import React, { Component } from "react";
import { connect } from "react-redux";
import { addBudget } from "../store/plaid"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);
import BudgetGraph from "./BudgetGraph";

const BudgetItem = (props) => {
  const { budget, transactions } = props;

  let hasBudgets = Object.keys(budget).length
  let totalSpent;
  let amountRemaining;
  console.log('<---HERE IS THE SINGLE BUDGET--->', budget)
  if (hasBudgets) {
    totalSpent = transactions
      .filter(transaction => transaction.category === budget.category)
      .map(transaction => transaction.amount)
      .reduce((acc, cur) => {
        return acc += cur;
      })
    amountRemaining = budget.amount - totalSpent;
  }


  /*
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  let data = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Budgeting',
        data: [totalSpent, amountRemaining],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  let options = {
    plugins: {
      title: {
        display: true,
        position: 'top',
        text: 'Budgeting by Category for Last 30 Days',
        fontSize: 50,
      },
    },
    animation: {
      animateScale: true,
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50,
      },
    },
    legend: {
      display: true,
      position: 'right',
    }
  }
  */

  return (
    <div>
      {/* <div className="pieChart"> */}
        <h1>{budget.category}</h1>
        <BudgetGraph totalSpent={totalSpent} amountRemaining={amountRemaining} />
      {/* </div> */}
    </div>
  )
}

export default BudgetItem;
