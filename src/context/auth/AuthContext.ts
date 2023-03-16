import { createContext } from "react";
import { AuthState, User } from "../../interfaces/auth.interface";

export type AuthContextProps = {
  authState: AuthState;
  loginUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;
