import ActionTypes from "../actionTypes";

let initialState = {
  data: [],
  type: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default usersReducer;
