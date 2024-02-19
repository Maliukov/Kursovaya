import React, {useEffect} from 'react';
import {router} from "./router/router";
import { RouterProvider } from "react-router-dom";
import {useAppDispatch} from "./store/hooks";
import {getTokenFromLocalStorage} from "./helpers/localstorage.helper";
import {AuthService} from "./services/auth.service";
import {login, logout} from "./store/user/userSlice";

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if (token) {
       const data = await AuthService.getUserProfile();

       if (data) {
         dispatch(login(data));
       } else {
         dispatch(logout());
       }
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    checkAuth();
  }, [])

  return <RouterProvider router={ router } />
}

export default App;
