import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      active: false,
    },
    pending: true,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      //console.log(action.payload);
      state.user = { ...state.user, ...action.payload };
      if (state.user.changedAvatar) {
        state.user.avatar = state.user.changedAvatar;
        delete state.user.changedAvatar;
      }
      state.user.active = true;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, ...action.payload })
      );
      //localStorage.setItem("user", JSON.stringify(state.user));
      //console.log(state.user);
      state.pending = false;
    },
    logOut: (state) => {
      state.user = {
        active: false,
      };
      localStorage.removeItem("user");
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const { updateStart, updateError, updateSuccess, logOut } =
  userSlice.actions;
export default userSlice.reducer;
