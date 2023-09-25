// import React, {useState} from "react";
import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = {
isLoggedIn : false,
token: localStorage.getItem("idToken"),

}

if(initialAuthState.token){
  initialAuthState.isLoggedIn =true
}else{
  localStorage.removeItem("idToken")
}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login (state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout (state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  }
})

export const authActions = authSlice.actions;


export default authSlice.reducer;

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const initialToken = localStorage.getItem("token");
//   const [token, setToken] = useState(initialToken);
  

//   const userIsLoggedIn = !!token;

//   const loginHandler = (token) => {
//     setToken(token);
//     localStorage.setItem("token", token)
//   };
//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("token")
//   };

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };


// export default AuthContext;