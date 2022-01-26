import axios from "axios";

//action types
const SET_GOAL = "SET_GOAL";
const ADD_GOAL = "ADD_GOAL";
const DELETE_GOAL = "DELETE_GOAL";

//action creators
const setGoal = (goal) => {
  // console.log('third: ', goal);
  return {
    type: SET_GOAL,
    goal,
  };
};

const _addGoal = (goal) => {
  // console.log('this is goal from _addGoal store/savingGoal: ',goal)
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
export const fetchGoals = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/goal/${id}`);
      // console.log('third: this is data', data)
      dispatch(setGoal(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addGoal = (goal, userId, formData) => {
  return async (dispatch) => {
    try {
      console.log("****************************formData", formData);
      console.log("****************************goal", goal);
      const { data: added } = await axios.post(`api/goal/${userId}`, formData, goal,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(
        "GHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNCGHJSDFGKJBBADWSFKJBESFDBHNSDJMXNC" +
          "this is added store/savingGoals ",
        added
      );
      dispatch(_addGoal(added));
      //history push maybe
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteGoal = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: user } = await axios.delete(`api/goal/${id}`, {
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

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GOAL:
      // console.log('Fouth: action dot goal =>', action.goal)
      return action.goal;
    case DELETE_GOAL:
      return state.filter((goal) => goal.id !== action.goal.id);
    case ADD_GOAL:
      return [...state, action.goal];
    default:
      return state;
  }
}