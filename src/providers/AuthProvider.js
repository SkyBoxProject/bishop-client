import React, { useContext, createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { config } from '../config';

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

export function AuthProvider({ children }) {
   const auth = useAuthProvider();
   return (
      <authContext.Provider value={auth}>
         {children}
      </authContext.Provider>
   );
}

function useAuth() {
   return useContext(authContext);
}

const AUTH_PENDING = 'AUTH_PENDING';
const AUTH_AUTHORIZED = 'AUTH_AUTHORIZED';
const AUTH_NOT_AUTHORIZED = 'AUTH_NOT_AUTHORIZED';

function useAuthProvider() {
   const [authStatus, setAuthStatus] = useState(AUTH_PENDING);

   useEffect(() => {
      setTimeout(() => {
         setUser('timeoutedUser');
         setAuthStatus(AUTH_AUTHORIZED);
      }, 5000);
   }, []);

   const saveLocalstorage = (token, expiresDate, refreshToken) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authTokenExpires', expiresDate);
      localStorage.setItem('refreshToken', refreshToken);
   }

   const clearLocalstorage = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpires');
   };

   const logout = () => {
      clearLocalstorage();
      setAuthStatus(AUTH_NOT_AUTHORIZED);
   };

   const login = (login, pass) => {
      return fetch(config.apiPath + '/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: { 'email': login, 'password': pass }
      }).then(resp => {
         if (!resp.ok) return logout();
         return resp.json();
      }).then(json => {
         saveLocalstorage(json.token, json.tokenExpires, json.refreshToken);
      });
   };

   /*проверяет что токен существует и не истек и возвращает его. если токен истек, рефрешит и возвращает*/
   const getToken = () => {
      //должен быть явный return new Promise(...)
      /* текущая дата: var currentDate = new Date().toUTCString()
         дата с сервера: var serverDate = new Date(fromServer).toUTCString();
         сравниваем: currentDate < serverDate
      */

      //TODO: вынести в отдельную функцию
      const currentDate = new Date(new Date().toUTCString());
      const expiresDate = new Date(new Date(localStorage.getItem('authTokenExpires')).toUTCString());
      const token = localStorage.getItem('authToken');
      if (currentDate < expiresDate) return token;
      else {
         return refreshToken(token);
      }
   }

   const refreshToken = (refreshToken) => {
      return fetch(config.apiPath + '/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: { 'refresh_token': refreshToken }
      }).then(resp => {
         if (!resp.ok) return resp.json();
         else return logout();
      }).then(json => {
         let {response} = json;
         saveLocalstorage(respose.token, response.tokenExpires, response.refreshToken);
         return response.token;
      });
   }

   const checkToken = async (token) => {
      return fetch(config.apiPath + '/token/check', {
         method: 'GET',
         headers: {'authorization': token}
      }).then(resp => {
         if (!resp.ok) await refreshToken();
         return resp.json();
      }).then(

      );
   };

   //ВАЖНО! в каждом ответе данные дополнительно завернуты в объект response т.е. получать их надо так: resp.json() => res.response()
   return {
      authStatus,
      login,
      logout,
      getToken
   };
}

function AuthButton() {
   let history = useHistory();
   let auth = useAuth();

   return auth.user ? (
      <p>
         Welcome!{" "}
         <button
            onClick={() => {
               auth.signout(() => history.push("/"));
            }}
         >
            Sign out
      </button>
      </p>
   ) : (
         <p>You are not logged in.</p>
      );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
   let auth = useAuth();
   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth.user ? (
               children
            ) : (
                  <Redirect
                     to={{
                        pathname: "/login",
                        state: { from: location }
                     }}
                  />
               )
         }
      />
   );
}

function PublicPage() {
   return <h3>Public</h3>;
}

function ProtectedPage() {
   return <h3>Protected</h3>;
}

function LoginPage() {
   let history = useHistory();
   let location = useLocation();
   let auth = useAuth();

   let { from } = location.state || { from: { pathname: "/" } };
   let login = () => {
      auth.signin(() => {
         history.replace(from);
      });
   };

   return (
      <div>
         <p>You must log in to view the page at {from.pathname}</p>
         <button onClick={login}>Log in</button>
      </div>
   );
}

export default AuthProvider;