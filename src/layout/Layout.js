import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { createUseStyles } from 'react-jss';
import { FaChessBishop } from "react-icons/fa";
import { SideMenu } from './SideMenu'

const useStyles = createUseStyles(theme => ({
   layout: {
      background: '#f7fafc',
      minWidht: '100vw',
      minHeight: '100vh'
   },
   mainWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '15px',
   },
   mainContent: {
      display: 'flex',
      alignItems: 'start',
      width: '100%'
   },
   headerPanel: {
      background: '#fff',
      height: '60px',
      boxShadow: '0px 2px 5px 0px rgb(0 0 0 / 20%)',
   },
   contentWrapper: {
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: '#fff',
      padding: '30px',
      flexGrow: 2
   },
   container: {
      maxWidth: theme.sizes.container,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '0 auto',
      height: '100%',
      width: '100%'
   }
}));

export function Layout(props) {
   const classes = useStyles();

   return <div className={classes.layout}>

      {/*top menu*/}
      <div className={classes.headerPanel}>
         <div className={classes.container}>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100 }}>
               <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
               <span>Bishop converter</span>
            </div>


            <span>Тестовая версия</span>
         </div>
      </div>

      {/*main row*/}
      <div className={classes.mainWrapper}>
         <div className={classes.container}>
            <div className={classes.mainContent}>

               {/*menu*/}
               <SideMenu />

               {/*content*/}
               <div className={classes.contentWrapper}>
                  {props.children}
               </div>

            </div>
         </div>
      </div>



   </div>
}

export default Layout;