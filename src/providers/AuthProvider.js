import React, { useContext, createContext, useState, useEffect } from "react";
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
      //MOCK, заглушка для успешной авторизации
      setTimeout(()=>{
         setAuthStatus(AUTH_AUTHORIZED);
      }, 1500);
      return;

      getToken().then(token => {
         if (token) setAuthStatus(AUTH_AUTHORIZED);
      });
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

   const getNewToken = (refreshToken) => {
      return fetch(config.apiPath + '/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: { 'refresh_token': refreshToken }
      }).then(resp => {
         if (!resp.ok) return resp.json();
         else {
            logout();
            throw new Error('Refresh token error');
         }
      }).then(json => {
         let { response } = json;
         saveLocalstorage(response.token, response.tokenExpires, response.refreshToken);
         return response.token;
      });
   }

   /*проверяет что токен существует и не истек и возвращает его. если токен истек, рефрешит и возвращает*/
   const getToken = async () => {
      //должен быть явный return new Promise(...)
      /* текущая дата: var currentDate = new Date().toUTCString()
         дата с сервера: var serverDate = new Date(fromServer).toUTCString();
         сравниваем: currentDate < serverDate
      */
      let token = localStorage.getItem('authToken');
      let tokenExpiresDate = localStorage.getItem('authTokenExpires');
      let refreshToken = localStorage.getItem('refreshToken');
      if (token && expiresDate && refreshToken) {
         logout();
         throw new Error('Token does not exist');
      }

      //TODO: вынести в отдельную функцию
      const currentDate = new Date(new Date().toUTCString());
      const expiresDate = new Date(new Date(tokenExpiresDate).toUTCString());
      if (currentDate < expiresDate) return token;
      else {
         return await getNewToken(refreshToken);
      };
   }

   const checkToken = async (token) => {
      return fetch(config.apiPath + '/token/check', {
         method: 'GET',
         headers: { 'authorization': token }
      }).then(resp => {
         return resp.json();
      });
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

   return auth.authStatus === AUTH_AUTHORIZED ? (
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

function FullscreenLoader(props) {
   return <div style={{background: '#e7ebef', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span>loading...</span>
   </div>
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
   let auth = useAuth();
   if (auth.authStatus === AUTH_PENDING) return <FullscreenLoader/>
   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth.authStatus === AUTH_AUTHORIZED ? (
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