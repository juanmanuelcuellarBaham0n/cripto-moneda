import React, { useReducer } from "react";
import { AuthState, User } from "../../interfaces/auth.interface";
import AuthContext from "./AuthContext";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE: AuthState = {
  users: [
    {
      email: "test1@test.com",
      password: "1234",
    },
    {
      email: "test2@test.com",
      password: "1234",
    },
  ],
};

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const loginUser = (user: User) => {
    dispatch({
      type: "LOGIN_USER",
      payload: user,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
