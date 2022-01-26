import React, { Component } from "react";
import { connect } from "react-redux";
import { addBudget } from "../store/plaid"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import BudgetItem from "./BudgetItem";
import transitions from "@material-ui/core/styles/transitions";
ChartJS.register(ArcElement, Tooltip, Legend, Title);


class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      amount: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  handleSubmit(e) {
		e.preventDefault();
    this.props.addBudget(this.props.user.id, this.state.category, this.state.amount)

	}

  render() {
    const { transactions, budgets, user } = this.props;
    let budgetCategories = transactions
      .map(transaction => transaction.category)
      .sort()
      .filter((category, idx, arr) => !idx || category != arr[idx - 1])

    /*
    budgets.forEach(budget => {
      transactions.forEach(item => {
          if (item.category === budget.category) items.push(item.amount);
      });

      totalSpent = items.reduce((acc, cur) => {
        return acc += cur;
      })

      amountRemaining = budget.amount - totalSpent;
    })

    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    */



    return (
      <div>
        {/* <h1>Budget Container</h1> */}
        {budgets.length ?
          <div className="budget-container">
            {budgets.map(budget => {
              return (
                <div className="pieChart">
                {/* <Doughnut options={options} data={data} /> */}
                  <BudgetItem budget={budget} transactions={transactions} />

                </div>
              )
            })}
            <h2>Set A Budget!</h2>
              <h3>Category:</h3>
              <form onSubmit={this.handleSubmit}>
                <select name="category" value={this.state.category} onChange={this.handleChange}>
                  {budgetCategories.map(category => <option>{category}</option>)}
                </select>
                <input name="amount" type="number" onChange={this.handleChange}/>
                <button type="submit">Set Budget</button>
              </form>
          </div>
          :
          <div>
            <h2>Set Your First Budget!</h2>
            <h3>Category:</h3>
            <form onSubmit={this.handleSubmit}>
              <select name="category" value={this.state.category} onChange={this.handleChange}>
                {transactions.map(transaction => <option>{transaction.category}</option>)}
              </select>
              <input name="amount" type="number" onChange={this.handleChange}/>
              <button type="submit">Set Budget</button>
            </form>

          </div>
        }


      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
	addBudget: (userId, category, amount) => dispatch(addBudget(userId, category, amount)),
});

export default connect(null, mapDispatch)(BudgetContainer);
