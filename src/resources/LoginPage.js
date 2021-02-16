import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   wrapper: {
      background: '#e5e7eb',
      maxWidth: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   loginCard: {
      boxShadow: '0 0 #0000,0 0 #0000,0 0 #0000,0 0 #0000,0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      background: '#fff',
      width: '33%',
      padding: '2rem',
   }
}));

export function LoginPage(props) {
   const classes = useStyles();

   return <div className={classes.wrapper}>
      <div className={classes.loginCard}>
         <h1>Login</h1>
         <input placeholder="login" />
         <input placeholder="password" />

         <div>
            <button>Login</button>
            <div>OR</div>
            <button>Register</button>
         </div>

      </div>
   </div>
}

export default LoginPage;