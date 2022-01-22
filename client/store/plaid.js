import axios from 'axios'

export const ADD_ACCOUNT = "ADD_ACCOUNT"
export const DELETE_ACCOUNT = "DELETE_ACCOUNT"
export const GET_ACCOUNTS = "GET_ACCOUNTS"
export const ACCOUNTS_LOADING = "ACCOUNTS_LOADING"
export const GET_TRANSACTIONS = "GET_TRANSACTIONS"
export const TRANSACTIONS_LOADING = "TRANSACTIONS_LOADING"

// Actions
// Parse accounts from request and send it to /accounts/add endpoint
// Concatenate the new account to our current accounts array and call getTransactions on the new accounts array

// Add Account
export const addAccount = plaidData => dispatch => {
  const accounts = plaidData.accounts
  axios
    .post('/api/plaid/accounts/add', plaidData)
    .then(res =>
      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data
      })
    )
    .then(data =>
      accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null
    )
    .catch(err => console.log(err))
}


// Delete account
// Filter out the deleted account from the accounts array before calling getTransactions
export const deleteAccount = plaidData => dispatch => {
  if (window.confirm('Are you sure you want to remove this account?')) {
    const id = plaidData.id
    console.log('plaidDataid ', plaidData)
    const newAccounts = plaidData.accounts.filter(
      account => account._id !== id
    )
    axios
      .delete(`/api/plaid/accounts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id
        })
      )
      .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
      .catch(err => console.log(err))
  }
}

// Get Accounts
// Get all accounts for specific user
export const getAccounts = (userData) => dispatch => {
  dispatch(setAccountsLoading())
  axios
    .get(`/api/plaid/accounts/${userData.id}`)
    .then(res =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: null
      })
    )
}
// Accounts loading
export const setAccountsLoading = () => {
  return {
    type: ACCOUNTS_LOADING
  }
}

// Get Transactions
export const getTransactions = plaidData => dispatch => {
  dispatch(setTransactionsLoading())
  axios
    .post('/api/plaid/transactions', plaidData)
    .then(res =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: null
      })
    )
}
// Transactions loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  }
}

const initialState = {
  accounts: [],
  transactions: [],
  accountsLoading: false,
  transactionsLoading: false
}

// Define how state will change based on which actions are called
export default function (state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return {
        ...state,
        accountsLoading: true
      }
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts]
      }
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account._id !== action.payload
        )
      }
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        accountsLoading: false
      }
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false
      }
    default:
      return state
  }
}