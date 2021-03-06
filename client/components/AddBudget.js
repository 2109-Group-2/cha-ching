import React, { Component } from "react";
import { addBudget } from "../store/plaid"
import { connect } from "react-redux";
import { setBudgets } from '../store/plaid'
import { Tabs, Tab } from 'react-bootstrap';

import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      amount: 0,
      startDate: '',
      endDate: '',
      custom: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(eventKey) {
    if (eventKey === 'fromTransactions') {
      this.setState({
        custom: false
      });
    } else if (eventKey === 'custom') {
      this.setState({
        custom: true
      });
    }
  }

  handleChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  handleSubmit(e) {
		e.preventDefault();
    this.props.addBudget(this.props.user.id, this.state.category, this.state.amount, this.state.startDate, this.state.endDate)
    this.props.setBudgets(this.props.user.id)

	}
  render() {
    const { budgets, transactions } = this.props;
    let budgetCategories = undefined;
    if(transactions) {
      budgetCategories = transactions
        .map(transaction => transaction.category)
        .sort()
        .filter((category, idx, arr) => !idx || category != arr[idx - 1])
    }

    return (
      <div className="modal-popup">
        <Tabs
          defaultActiveKey="fromTransactions"
          id="uncontrolled-tab-example"
          onSelect={(eventKey) => {
            this.handleClick(eventKey);
          }}
          className="mb-2 modal-tabs"
        >
          <Tab className="budgets-from" eventKey="fromTransactions" title="Transaction Categories"></Tab>
          <Tab className="budgets-from-tab" eventKey="custom" title="Custom"></Tab>

        </Tabs>

        <form className="modal-form" onSubmit={this.handleSubmit}>
          <h3>Category:</h3>
          {this.state.custom ?
            <input name="category" type="text" value={this.state.category} onChange={this.handleChange} />
            :
            <select name="category" value={this.state.category} onChange={this.handleChange}>
              {budgetCategories && budgetCategories.map(category => <option>{category}</option>)}
          </select>
          }
          <h3>Amount:</h3>
          <input name="amount" type="number" value={this.state.amount} onChange={this.handleChange} />
          <h3>Start Date:</h3>
          <input name="startDate" type="date" value={this.state.startDate} onChange={this.handleChange} />
          <h3>End Date:</h3>
          <input name="endDate" type="date" value={this.state.endDate} onChange={this.handleChange} />
          <div>
            <button className="btn btn-danger budget-submit-button" type="submit">Set Budget</button>
          </div>
        </form>
      </div>
    )
  }

}


const mapDispatch = (dispatch) => ({
	addBudget: (userId, category, amount, startDate, endDate) => dispatch(addBudget(userId, category, amount, startDate, endDate)),
  setBudgets: (user) => dispatch(setBudgets(user))
});


const AddBudgetForm = connect(null, mapDispatch)(AddBudget);

const Modal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  user,
  budgets,
  transactions
}) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            {/* <AddBudgetForm user={user} /> */}
            <AddBudgetForm transactions={transactions} user={user} budgets={budgets} />
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default Modal;
