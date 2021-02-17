import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss'
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {Divider} from '../components/Divider';
import { useHistory } from "react-router";

const useStyles = createUseStyles(theme => ({
   wrapper: {
      background: '#e5e7eb', //#f7fafc
      maxWidth: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   loginCard: {
      boxShadow: '0 0 #0000,0 0 #0000,0 0 #0000,0 0 #0000,0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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