import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import {createUseStyles, useTheme, ThemeProvider} from 'react-jss';
import {theme} from './themes/mainTheme';
import { AuthProvider, PrivateRoute } from './providers/AuthProvider';
import { LoginPage } from './resources/LoginPage';
import { Layout } from './layout/Layout';

function App() {
   return (
      <AuthProvider>
         <ThemeProvider theme={theme}>

         <Router>
            
            <Switch>
               <Route path="/login">
                  <LoginPage />
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
