export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  users: User[];
}
