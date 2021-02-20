import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss'
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {Divider} from '../components/Divider';
import { useHistory } from "react-router";

const useStyles = createUseStyles(theme => ({
   '@keyframes slideLeft': {
      from: {
         opacity: 0,
         transform: 'translateX(30px) scale(0.98)'
      },
      to: {
         opacity: 1,
         transform: 'translateX(0px) scale(1)'
      }
    },
   wrapper: {
      background: '#f7fafc', //#f7fafc
      maxWidth: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   loginCard: {
      animation: '$slideLeft ease-in 0.3s',
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: '#fff',
      width: '410px',
      padding: '2rem',
   }
}));

export function LoginPage(props) {
   const classes = useStyles();
   const history = useHistory();

   const redirectToRegistration = () => {
      history.push('/registration');
   }

   return <div className={classes.wrapper}>
      <div className={classes.loginCard}>
         <h1 style={{fontWeight: 300}}>Bishop: вход в сервис</h1>

         <Input placeholder="Эл.почта" />
         <Input placeholder="Пароль" />

         <div style={{marginTop: '10px'}}>
            <Button fullWidth>Войти</Button>
            <Divider />
            <Button fullWidth onClick={redirectToRegistration}>Регистрация</Button>
         </div>

      </div>
   </div>
}

export default LoginPage;