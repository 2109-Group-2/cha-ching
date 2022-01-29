/*
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);
import BudgetGraph from "./BudgetGraph";

const BudgetItem = (props) => {
  const { budget, transactions } = props;

  let dateRange = (date) => {
    return moment(date).isBetween(budget.startDate, budget.endDate)
  }

  let hasBudget = Object.keys(budget).length
  let totalSpent;
  let amountRemaining;

  if (hasBudget) {
    totalSpent = transactions
      .filter(transaction => transaction.category === budget.category && dateRange(transaction.date))
      .map(transaction => transaction.amount)
      .reduce((acc, cur) => {
        return acc += cur;
      }, 0)
    amountRemaining = budget.amount - totalSpent;
  }

  return (
      <div className="budget-item">
        <h1>{budget.category}</h1>
        <BudgetGraph budget={budget} totalSpent={totalSpent} amountRemaining={amountRemaining} />
      </div>
  )
}

export default BudgetItem;
*/

/*
import React, { Component } from "react";
import { connect } from "react-redux";
import { addBudget } from "../store/plaid"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);
import BudgetGraph from "./BudgetGraph";
import { Grid } from 'semantic-ui-react'

const BudgetItem = (props) => {
  const { budget, transactions } = props;

  let dateRange = (date) => {
    return moment(date).isBetween(budget.startDate, budget.endDate)
  }

  let hasBudget = Object.keys(budget).length
  let totalSpent;
  let amountRemaining;

  if (hasBudget) {
    totalSpent = transactions
      .filter(transaction => transaction.category === budget.category && dateRange(transaction.date))
      .map(transaction => transaction.amount)
      .reduce((acc, cur) => {
        return acc += cur;
      }, 0)
    amountRemaining = budget.amount - totalSpent;
  }

  return (
      <>
        <Grid.Row>
          <Grid.Column>
            <BudgetGraph budget={budget} totalSpent={totalSpent} amountRemaining={amountRemaining} />
          </Grid.Column>
          <Grid.Column>
            <h1>{budget.category}</h1>
          </Grid.Column>
          <Grid.Column>
            <h1>{budget.amount}</h1>
          </Grid.Column>
        </Grid.Row>
      </>
  )
}

export default BudgetItem;
*/


import React, { Component } from "react";
import { connect } from "react-redux";
import { addBudget } from "../store/plaid"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);
import BudgetGraph from "./BudgetGraph";
import { Card, Button } from 'react-bootstrap';

const BudgetItem = (props) => {
  const { budget, transactions } = props;

  let dateRange = (date) => {
    return moment(date).isBetween(budget.startDate, budget.endDate)
  }

  let hasBudget = Object.keys(budget).length
  let totalSpent;
  let amountRemaining;

  if (hasBudget) {
    totalSpent = transactions
      .filter(transaction => transaction.category === budget.category && dateRange(transaction.date))
      .map(transaction => transaction.amount)
      .reduce((acc, cur) => {
        return acc += cur;
      }, 0)
    const amount = budget.amount - totalSpent;
    amountRemaining = amount > 0 ? amount : 0;
  }

  return (
      <Card className="budget-item">
        <Card.Body>
          <Card.Title>
            <h6>Budget: {budget.category}</h6>
          </Card.Title>
          <Card.Text>
            <h6>Amount: {budget.amount}</h6>
            <h6>Date: {moment(budget.startDate).format('M/d/YYYY')} - {moment(budget.endDate).format('M/d/YYYY')}</h6>
            <BudgetGraph budget={budget} totalSpent={totalSpent} amountRemaining={amountRemaining} />
            <h6>Spent: {totalSpent} </h6>
            <h6>Remaining: {amountRemaining > 0 ? amountRemaining : 'Over Budget!'} </h6>
          </Card.Text>
        </Card.Body>
      </Card>
  )
}

export default BudgetItem;
