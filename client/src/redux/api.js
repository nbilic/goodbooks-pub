import { updateStart, updateSuccess, updateError, logOut } from "./userSlice";
export const updateUser = async (user, dispatch) => {
  dispatch(updateStart());
  if (user)
    try {
      //console.log(user);

      dispatch(updateSuccess(user));
    } catch (error) {
      console.log(error);
      dispatch(updateError());
    }
};

export const logoutUser = async (dispatch) => {
  dispatch(updateStart());
  try {
    dispatch(logOut());
  } catch (error) {
    dispatch(updateError());
  }
};
