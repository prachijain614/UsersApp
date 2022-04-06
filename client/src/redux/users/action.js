import ActionTypes from "../actionTypes";

export const setUsers = (data) => (dispatch) =>
  dispatch({
    type: ActionTypes.SET_USERS,
    payload: { data },
  });
