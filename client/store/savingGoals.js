import axios from "axios";

//action types
const SET_GOAL = "SET_GOAL";
const ADD_GOAL = "ADD_GOAL";
const DELETE_GOAL = "DELETE_GOAL";

//action creators
const setGoal = (goal) => {
  return {
    type: SET_GOAL,
    goal,
  };
};

const _addGoal = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  };
};

const _deleteGoal = (goal) => {
  return {
    type: DELETE_GOAL,
    goal,
  };
};

//thunk creators
export const fetchGoals = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get("api/products/admin", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setGoal(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addGoal = (goal) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: added } = await axios.post("api/products/admin", goal, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_addGoal(added));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductAdmin = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: user } = await axios.delete(`api/products/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteGoal(user));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function productsAdminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GOAL:
      return action.goal;
    case DELETE_GOAL:
      return state.filter((goal) => goal.id !== action.goal.id);
    case ADD_GOAL:
      return [...state, action.goal];
    default:
      return state;
  }
}
