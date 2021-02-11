import React, { useContext, createContext, useState } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect,
   useHistory,
   useLocation
} from "react-router-dom";
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

function useAuthProvider() {
   const [isAuthenticated, setAuthenticated] = useState(checkAuthStatus());
   const [tokenExpires, setTokenExpires] = useState(null);

   const checkAuthStatus = () => {
      return(localStorage.getItem('authToken') && localStorage.getItem('authTokenExpires'));
   }

   const saveLocalstorage = (token, expiresDate) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authTokenExpires', expiresDate);
   }

   const clearLocalstorage = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpires');
   };

   const logout = () => {
      clearLocalstorage();
      setAuthenticated(false);
   };

   const login = (login, pass) => {
      return fetch(config.apiPath + '/login', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: {'email': login, 'password': pass}
      }).then(resp => {
         if (!resp.ok) logout();
         return resp.json();
      }).then(json => {
         setTokenExpires(json.tokenExpires);
         saveLocalstorage(json.token, json.tokenExpires)
      });
   };

   return {
      login,
      logout,
      tokenExpires,
      isAuthenticated
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