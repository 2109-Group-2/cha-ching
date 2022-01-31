import React, {Component} from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { setBudgets, getTransactions } from '../store/plaid'
import BudgetItem from "./BudgetItem";
import ModalContainer from "./ModalContainer";
import MiniBudgets from "./MiniBudgets";

class BudgetContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setBudgets(this.props.auth.user);
    this.props.getTransactions(this.props.auth.user);
  }



  render() {
    const { user } = this.props.auth;
    let  { budgets, transactions } = this.props.plaid;
    let transactionsData = [];

    transactions.forEach(function (account) {
      account.transactions.forEach(function (listByAccount) {
        transactionsData.push({
          transactionId: listByAccount.transaction_id,
          account: account.accountName,
          date: listByAccount.date,
          category: listByAccount.category[0],
          name: listByAccount.name,
          amount: listByAccount.amount,
        });
      });
    });



    const today = moment().format('YYYY-MM-DD');
    const isActive = (end) => moment(today).isBefore(end);
    budgets = budgets.filter(budget => isActive(budget.endDate));


    return (
      <div className="budgets-container">
        <div className="top-of-budgets">
          <MiniBudgets transactions={transactionsData} />
          <ModalContainer budgets={budgets} transactions={transactionsData} user={user} />
        </div>
        <div className="bottom-of-budgets">
          {budgets.length ?
            <>
              {budgets.map(budget => {
                return (
                  <>
                    <BudgetItem budget={budget} transactions={transactionsData} />
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
      </div>
    )
  }

}

const mapState = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
  setBudgets: (user) => dispatch(setBudgets(user)),
  getTransactions: (userData) => dispatch(getTransactions(userData)),
})

export default connect(mapState, mapDispatch)(BudgetContainer);


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
