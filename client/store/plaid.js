import axios from 'axios'

export const ADD_ACCOUNT = "ADD_ACCOUNT"
export const DELETE_ACCOUNT = "DELETE_ACCOUNT"
export const GET_ACCOUNTS = "GET_ACCOUNTS"
export const ACCOUNTS_LOADING = "ACCOUNTS_LOADING"
export const GET_TRANSACTIONS = "GET_TRANSACTIONS"
export const TRANSACTIONS_LOADING = "TRANSACTIONS_LOADING"
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const SET_LINK_TOKEN = "SET_LINK_TOKEN"
export const GET_BUDGETS = "GET_BUDGETS"
export const SET_BUDGETS = "SET_BUDGETS"
export const ADD_BUDGET = "ADD_BUDGET"


// Actions
// Parse accounts from request and send it to /accounts/add endpoint
// Concatenate the new account to our current accounts array and call getTransactions on the new accounts array

export const setLinkToken = (userId) => async dispatch => {
  const res = await axios.post(
			`/api/plaid/create_link_token/${userId}`
		);
		const data = res.data.link_token;
    dispatch({
      type: SET_LINK_TOKEN,
      payload: data.link_token
    })

}

// Create Plaid Item: Request Access Token and Account - add to store
export const setItem = (token, userId, metadata) => async dispatch => {
  try {
    // Request Access Token
    const res = await axios.post('/api/plaid/set_item', { token });
    // Add Acount
    const res2 = await axios.post('/api/plaid/accounts/add', {userId, metadata});

    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: res.data.token
    })
    dispatch({
      type: ADD_ACCOUNT,
      payload: res2.data
    })
  } catch (error) {
    console.log('<---setAccessToken Thunk ERROR--->')
  }


}

// Delete account
// Filter out the deleted account from the accounts array before calling getTransactions
export const deleteAccount = plaidData => dispatch => {
  if (window.confirm('Are you sure you want to remove this account?')) {
    const id = plaidData.id
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
export const getTransactions = (plaidData, period = 3) => dispatch => {
  dispatch(setTransactionsLoading())
  axios
    .post('/api/plaid/transactions', {
      plaidData,
      period
    })
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

// BUDGETS
export const setBudgets = (user) => async dispatch => {
  const res = await axios.get(`/api/plaid/budgets/${user.id}`)
  dispatch({
    type: SET_BUDGETS,
    payload: res.data
  })
}

// Add Budget
export const addBudget = (userId, category, amount) => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/budgets/add', {
      userId,
      category,
      amount
    })
    dispatch({
      type: ADD_BUDGET,
      payload: res.data
    })
  } catch(error) {
    console.log('Error in the addBudget thunk')
    console.log(error)

  }

}

// Transactions loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  }
}

const initialState = {
  token: '',
  access_token: '',
  budgets: [],
  accounts: [],
  transactions: [],
  accountsLoading: false,
  transactionsLoading: false
}

// Define how state will change based on which actions are called
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LINK_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload
      }
    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload
      }
    case ADD_BUDGET:
      return {
        ...state,
        budgets: [action.payload, ...state.budgets]
      }
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
