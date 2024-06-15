import { LOGIN, LOGOUT } from "../pages/stock/store/constants";

export const authentication = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
        localStorage.setItem("auth_lorcana", "true");
        localStorage.setItem("username", action.payload);
      return true;
    case LOGOUT:
        localStorage.setItem("auth_lorcana", "false");
        localStorage.setItem("username", null);
      return false;
    default:
      return state;
  }
};
