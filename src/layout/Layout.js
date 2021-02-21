import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { createUseStyles } from 'react-jss';
import { FaChessBishop } from "react-icons/fa";

const useStyles = createUseStyles(theme => ({
   layout: {
      background: '#f7fafc',
      minWidht: '100vw',
      minHeight: '100vh'
   },
   mainWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '15px'
   },
   mainGrid: {
      display: 'flex'
   },
   headerPanel: {
      background: '#fff',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      boxShadow: '0px 2px 5px 0px rgb(0 0 0 / 20%)',
      justifyContent: 'space-around'
   },
   contentWrapper: {
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: '#fff',
      padding: '30px',
      width: '600px',
      maxWidth: '600px'
   }
}));

export function Layout(props) {
   const auth = useAuth();
   const classes = useStyles();

   return <div className={classes.layout}>

      {/*top menu*/}
      <div className={classes.headerPanel}>
         <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100 }}>
            <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
            <span>Bishop converter</span>
         </div>

         <span>Тестовая версия</span>
      </div>

      {/*main row*/}
      <div className={classes.mainWrapper}>
         <div className={classes.mainGrid}>

            {/*menu*/}
            <div style={{ marginRight: '30px' }}>
               <nav>
                  <ul>
                     <li>
                        <Link to="/">Главная</Link>
                     </li>
                     <li>
                        <Link to="/about">About</Link>
                     </li>
                     <li>
                        <Link to="/users">Users</Link>
                     </li>
                     <li>
                        <button onClick={() => auth.logout()}>LOGOUT</button>
                     </li>
                  </ul>
               </nav>
            </div>

            {/*content*/}
            <div className={classes.contentWrapper}>
               {props.children}
            </div>

         </div>
      </div>



   </div>
}

export default Layout;