import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   sideMenuWrapper: {
      marginRight: '30px',
      '& ul': {
         listStyle: 'none',
         margin: 0,
         padding: 0
      }
   },
}));

function SideMenuLink({ label, to, activeOnlyWhenExact }) {
   let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
   });

   return (
      <div className={match ? "active" : ""}>
         {match && "> "}
         <Link to={to}>{label}</Link>
      </div>
   );
}

export function SideMenu(props) {
   const auth = useAuth();
   const classes = useStyles();

   return <div className={classes.sideMenuWrapper}>
      <nav>
         <ul>
            <li>
               <SideMenuLink to="/" activeOnlyWhenExact={true} label="Главная" />
            </li>
            <li>
               <SideMenuLink to="/about" label="About" />
            </li>
            <li>
               <SideMenuLink to="/users" label="Users" />
            </li>
            <li>
               <button onClick={() => auth.logout()}>LOGOUT</button>
            </li>
         </ul>
      </nav>
   </div>
}
export default SideMenu;