import { AuthState, User } from "../../interfaces/auth.interface";

type Actions =
  | { type: "REGISTER_USER"; payload: User }
  | { type: "LOGIN_USER"; payload: User }
  | { type: "LOGOUT" };

export const AuthReducer = (state: AuthState, action: Actions): AuthState => {
  switch (action.type) {
    case "LOGIN_USER":
      localStorage.setItem("token", "TOKEN_KEY");
      return {
        ...state,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
      };

    default:
      return state;
  }
};
