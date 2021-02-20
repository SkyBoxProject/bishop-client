import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss'
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {Divider} from '../components/Divider';
import { useHistory } from "react-router";
import { Form } from 'react-final-form';

const useStyles = createUseStyles(theme => ({
   '@keyframes slideRight': {
      from: {
         opacity: 0,
         transform: 'translateX(-30px) scale(0.98)'
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
      animation: '$slideRight ease-in 0.3s',
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: '#fff',
      width: '410px',
      padding: '2rem',
   }
}));

export function RegistrationPage(props) {
   const classes = useStyles();
   const history = useHistory();
   const [response, setResponse] = useState('');

   const backToLogin = () => {
      history.push('/login');
   }

   return <div className={classes.wrapper}>
      <div className={classes.loginCard}>
         <h1 style={{fontWeight: 300}}>Bishop: регистрация</h1>

         <Input placeholder="Эл.почта" />
         <Input placeholder="Пароль" />
         <Input placeholder="Повторите пароль" />

         <p>{response}</p>

         <div style={{marginTop: '10px'}}>
            <Button fullWidth>Зарегистрироваться</Button>
            <Divider />
            <Button fullWidth onClick={backToLogin}>Назад ко входу</Button>
         </div>

      </div>
   </div>
}

export default RegistrationPage;