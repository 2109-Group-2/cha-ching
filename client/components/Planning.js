import React, {Component} from "react";
import { connect } from "react-redux";
import BudgetContainer from "./BudgetContainer";
import { setBudgets } from '../store/plaid'
import ModalContainer from "./ModalContainer";

class Planning extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setBudgets(this.props.auth.user.id);
  }

  render() {
    const { transactions, budgets } = this.props.plaid;
    const { user } = this.props.auth;
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

    return (
      <div>
        <h1>Financial Planning</h1>
        <ModalContainer budgets={budgets} transactions={transactionsData} user={user} />
        {!transactions ? (
          <></>
          ) : (
            <BudgetContainer transactions={transactionsData} user={user} budgets={budgets} />
          )}

      </div>
    )
  }
}

const mapState = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
  setBudgets: (user) => dispatch(setBudgets(user))
})

export default connect(mapState, mapDispatch)(Planning);
