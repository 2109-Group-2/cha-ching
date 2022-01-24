import React, { Component } from "react";
import { connect } from "react-redux";
import { addBudget } from "../store/plaid"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
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
    let items = [];
    let amountRemaining;
    let totalSpent;
    budgets.forEach(budget => {
      transactions.forEach(item => {
          if (item.category === budget.category) items.push(item.amount);
      });

      // let dataAmount = [];
      totalSpent = items.reduce((acc, cur) => {
        return acc += cur;
      })

      amountRemaining = budget.amount - totalSpent;
      console.log(totalSpent)
      console.log(amountRemaining)
    })

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


    return (
      <div>
        <h1>Budget Container</h1>
        {budgets.length ?
          <div className="pieChart">
            <Pie options={options} data={data} />
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
