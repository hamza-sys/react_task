import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated'),
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', action.payload.user_id)
      localStorage.setItem('role', action.payload.role)
      localStorage.setItem('isAuthenticated', true)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        role: action.payload.role
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    // window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
      const token = localStorage.getItem('token')
      if (!token) {
        tokenExpireError(dispatch, 'TOKEN_EXPIRED')
      } 
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
