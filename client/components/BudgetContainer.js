import React, { Component } from "react";
import moment from 'moment';
import BudgetItem from "./BudgetItem";

const BudgetContainer = (props) => {

  let { user, budgets, transactions } = props;

  const today = moment().format('YYYY-MM-DD');
  const isActive = (end) => moment(today).isBefore(end);
  budgets = budgets.filter(budget => isActive(budget.endDate))

  return (
    <div className="chartsAndTables">

      {budgets.length ?
        <>
          {/* <ModalContainer budgets={budgets} transactions={transactions} user={user} /> */}
          {budgets.map(budget => {
            return (
              <>
                <BudgetItem budget={budget} transactions={transactions} />
              </>
            )
          })}
        </>
        :
        <>
          {/* <ModalContainer budgets={budgets} transactions={transactions} user={user} /> */}
        </>
      }
    </div>
  )

}

export default BudgetContainer

/*
import React, { Component } from "react";
import moment from 'moment';
import BudgetItem from "./BudgetItem";
import ModalContainer from './ModalContainer'

const BudgetContainer = (props) => {

  let { user, budgets, transactions } = props;

  const today = moment().format('YYYY-MM-DD');
  const isActive = (end) => moment(today).isBefore(end);
  budgets = budgets.filter(budget => isActive(budget.endDate))

  return (
    <div className="budget-container">
      {budgets.length ?
        <>
          <ModalContainer budgets={budgets} transactions={transactions} user={user} />
          {budgets.map(budget => {
            return (
              <div id='budget-item'>
                <BudgetItem budget={budget} transactions={transactions} />
              </div>
            )
          })}
        </>
        :
        <>
          <ModalContainer budgets={budgets} transactions={transactions} user={user} />
        </>
      }
    </div>
  )

}

export default BudgetContainer;
*/

/*
import { Grid } from 'semantic-ui-react'
import React, { Component } from "react";
import moment from 'moment';
import BudgetItem from "./BudgetItem";
import ModalContainer from './ModalContainer'

const BudgetContainer = (props) => {

  let { user, budgets, transactions } = props;

  const today = moment().format('YYYY-MM-DD');
  const isActive = (end) => moment(today).isBefore(end);
  budgets = budgets.filter(budget => isActive(budget.endDate))

  return (
    <div className="budget-container">



      {budgets.length ?
        <>
          <ModalContainer budgets={budgets} transactions={transactions} user={user} />
          <div className="budgets">
            <Grid columns={3}>
              {budgets.map(budget => {
                return (
                  <>
                    <BudgetItem budget={budget} transactions={transactions} />
                  </>
                )
              })}
            </Grid>
          </div>
        </>
        :
        <>
          <ModalContainer budgets={budgets} transactions={transactions} user={user} />
        </>
      }
    </div>
  )

}

export default BudgetContainer
*/
