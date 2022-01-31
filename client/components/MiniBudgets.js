import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SpendingPieChart from './SpendingPieChart';
import { Tabs, Tab } from 'react-bootstrap';

class MiniBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
			transactionsByDate: [],
			comparisonData: [],
		};
  }

  render() {
    const { transactions } = this.props;
    const { transactionsByDate } = this.state;

    const today = moment();
    const thisMonth = moment().format("MMMM");
    const thisQuarter = moment().format("Q");
    const thisYear = moment().format("YYYY");
    const beginMonth = moment().startOf("month");
    const beginQuarter = moment().startOf('quarter');
    const beginYear = moment().startOf('year');
    const endMonth = moment().endOf("month");
    const lastMonthBegin = beginMonth.subtract(1, 'months');
		const lastMonthEnd = endMonth.subtract(1, 'months');

    const handleClick = (eventKey) => {
      if (eventKey === 'monthly') {
        this.setState({
          transactionsByDate: transactions.filter((data) =>
            moment(data.date).isBetween(beginMonth, today)
          ),
          // comparisonData: transactions.filter((data) =>
          //   moment(data.date).isBetween(lastMonthBegin, lastMonthEnd)
          // ),
        });
      } else if (eventKey === 'quarterly') {
        this.setState({
          transactionsByDate: transactions.filter((data) =>
            moment(data.date).isBetween(beginQuarter, today)
          )
        });
      } else if (eventKey === 'yearly') {
        this.setState({
          transactionsByDate: transactions.filter((data) =>
            moment(data.date).isBetween(beginYear, today)
          )
        });
      } else if (eventKey === 'allTime') {
        this.setState({
          transactionsByDate: transactions,
          comparisonData: transactions,
        });
      }
    };

    return (
      <div className="mini-budgets-container">
        <Tabs
          defaultActiveKey="allTime"
          id="uncontrolled-tab-example"
          // justify
          onSelect={(eventKey) => {
            handleClick(eventKey);
          }}
          className="mini-budgets-tabs-container"
        >
          <Tab className="mini-budgets-tab" eventKey="allTime" title="All Time"></Tab>
          <Tab className="mini-budgets-tab" eventKey="yearly" title={thisYear}></Tab>
          <Tab className="mini-budgets-tab" eventKey="quarterly" title={`Q ${thisQuarter}`}></Tab>
          <Tab className="mini-budgets-tab" eventKey="monthly" title={thisMonth}></Tab>
        </Tabs>
        {transactions.length ?
          transactionsByDate.length === 0 ?
            this.setState({
              transactionsByDate: transactions,
              // comparisonData: transactionsDat,
            })
          : ''
        : ''}
        <Card className="mini-budgets-card-item">
          <Card.Body className="mini-budgets-card-body">
            <Card.Title>
              <div className="graph-title">
                <h3>Spending By Category</h3>
              </div>
            </Card.Title>
            <Card.Text>
              <SpendingPieChart transactionsByDate={this.state.transactionsByDate} />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default MiniBudgets;
