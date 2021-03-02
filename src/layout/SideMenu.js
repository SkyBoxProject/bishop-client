import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { createUseStyles } from 'react-jss';
import {Button} from '../components/Button';

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

const useLinkStyles = createUseStyles(theme => ({
   link: {
      padding: '5px 20px',
      display: 'block',
      textDecoration: 'none',
      borderRadius: '3px',
      borderLeft: `3px solid transparent`,
      color: 'rgba(113,128,150)',
      '&:hover': {
         background: '#edf2f7'
      }
   },
   activeLink: {
      color: '#2b3044',
      fontWeight: 'bold',
      //background: '#e3e9ef',
      borderLeft: `3px solid ${theme.colors.primary}`
   }
}));

function SideMenuLink({ label, to, activeOnlyWhenExact }) {
   const classes = useLinkStyles();

   let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
   });

   return (
      <div>
         <Link to={to} className={classes.link + (match ? " " + classes.activeLink : "")}>{label}</Link>
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
               <Button style={{marginTop: '25px'}} onClick={() => auth.logout()}>Выход</Button>
            </li>
         </ul>
      </nav>
   </div>
}
export default SideMenu;