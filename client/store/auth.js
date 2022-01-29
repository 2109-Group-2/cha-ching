import axios from "axios";
import history from "../history";
import jwt_decode from "jwt-decode";
const isEmpty = require("is-empty");

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
const GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS"
const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION"
const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION"

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/auth/signup", userData)
    .then((res) => history.push("/login")) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/auth/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("token", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/dashboard");
    })
    .catch(
      (err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      // console.log(res.data)
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const authenticate =
  (username, password, name = null, email = null, method) =>
  async (dispatch) => {
    let res;
    try {
      if (method === "signup") {
        res = await axios.post(`/auth/${method}`, {
          username,
          password,
          name,
          email,
        });
        history.push("/login");
      } else {
        res = await axios.post(`/auth/${method}`, { email, password });
        window.localStorage.setItem(TOKEN, res.data.token);
        dispatch(me());
        history.push("/user/:id");
      }
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const editUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return dispatch(setAuth(res.data));
  } catch (error) {
    console.log("oops something happened inside store/auth/editUser: ", error);
  }
};

export const getSubscriptions = (userData) => (dispatch) => {
  axios
    .get(`/api/user/subscriptions/${userData.id}`)
    .then((res) =>
      dispatch({
        type: GET_SUBSCRIPTIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SUBSCRIPTIONS,
        payload: null,
      })
    );
};

export const deleteSubscription = (subscriptionData) => async (dispatch) => {
  try {
    if (window.confirm("Are you sure you want to remove this subscription?")) {
      console.log("=== USER DATA IN DELETE THUNK ===", subscriptionData);

      const id = subscriptionData.id;
      const newSubscription = await subscriptionData.subscriptions.filter(
        (subscription) => subscription._id === id
      );
      console.log("=== ACCOUNT DATA TO BE DELETED ===", newSubscription);
      const userId = newSubscription[0].userId;
      console.log("newSubscription.userId", newSubscription[0].userId);

      axios.delete(`/api/user/subscriptions/${userId}`, { data: newSubscription });
      dispatch({
        type: DELETE_SUBSCRIPTION,
        payload: id,
      });
      newSubscription ? dispatch(getSubscriptions(newSubscription)) : null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addSubscription = (userId, subscriptionData) => async (dispatch) => {
	try {
		// Add Acount
		const res = await axios.post(`/api/user/subscriptions/${userId}`, 
			subscriptionData
		);
		dispatch({
			type: ADD_SUBSCRIPTION,
			payload: res.data,
		});
	} catch (error) {
		console.log('<---add subscription thunk error--->', error);
	}
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTH:
      return action.auth;
    case GET_SUBSCRIPTIONS:
			return {
				...state,
				subscriptions: action.payload,
			};
      case DELETE_SUBSCRIPTION:
        return {
          ...state,
          subscriptions: state.subscriptions.filter(
            (subscription) => subscription._id !== action.payload
          ),
        };
        case ADD_SUBSCRIPTION:
          return {
            ...state,
            subscriptions: [...state.subscriptions, action.payload],
          };
    default:
      return state;
  }
}
