import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import jss from 'jss';
import { ThemeProvider } from 'theming';


function App() {
   return (
      <Router>
         <div className="test">
            <div className="test">init</div>
         </div>

         <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
               <a href="/test">Test</a>
            </li>
          </ul>
        </nav>

         <Switch>
            <Route path="/about">
               <About />
            </Route>
            <Route path="/users">
               <Users />
            </Route>
            <Route path="/">
               <Home />
            </Route>
         </Switch>

      </Router>
   );
}

function Home() {
   return <h2>Home</h2>;
 }
 
 function About() {
   return <h2>About</h2>;
 }
 
 function Users() {
   return <h2>Users</h2>;
 }

export default App;
