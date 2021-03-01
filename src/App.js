import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { createUseStyles, useTheme, ThemeProvider } from 'react-jss';
import { theme } from './themes/mainTheme';
import { AuthProvider, PrivateRoute } from './providers/AuthProvider';
import { LoginPage } from './resources/LoginPage';
import { RegistrationPage } from './resources/RegistrationPage';
import { Layout } from './layout/Layout';
import { Bsod, useBsodCode } from './components/Bsod';
import { useState } from "react";

function App() {
   const [isBsod, setBsod] = useState(false);
   useBsodCode(() => {
      setBsod(true);
      setTimeout(() => {
         setBsod(false);
      }, 3000);
   });

   return (
      <AuthProvider>
         <ThemeProvider theme={theme}>

            {isBsod ? <Bsod /> : ''}

            <Router>

               <Switch>
                  <Route path="/login">
                     <LoginPage />
                  </Route>
                  <Route path="/registration">
                     <RegistrationPage />
                  </Route>
                  <PrivateRoute path="/about">
                     <About />
                  </PrivateRoute>
                  <PrivateRoute path="/users">
                     <Users />
                  </PrivateRoute>
                  <PrivateRoute path="/">
                     <Home />
                  </PrivateRoute>
               </Switch>

            </Router>

         </ThemeProvider>
      </AuthProvider>
   );
}

function Home() {
   return <Layout>
      <h2>Home</h2>
   </Layout>;
}

function About() {
   return <Layout>
      <h2>About</h2>
   </Layout>;
}

function Users() {
   return <Layout>
      <h2>Users</h2>
   </Layout>;
}

export default App;
