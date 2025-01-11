export interface AuthStore {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}
