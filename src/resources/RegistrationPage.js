import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Divider } from '../components/Divider';
import { useHistory } from "react-router";
import { Form, Field } from 'react-final-form';
import { FaChessBishop } from "react-icons/fa";
import { Alert } from '../components/Alert';
import { config } from '../config';

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
      //background: '#f7fafc', //#f7fafc
      maxWidth: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //original fill: #7F7BFB
      background: `#f7fafc url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 200 200" xml:space="preserve" height="800px" width="800px"><g><path fill="%23C7D2FE" d="M41.3,-52.9C54.4,-47.3,66.6,-36.4,73.8,-22.1C81,-7.8,83.2,10,75.4,21.7C67.7,33.4,50.1,39.1,35.9,47.5C21.7,56,10.8,67.3,0,67.3C-10.8,67.3,-21.6,55.9,-35.7,47.4C-49.9,38.9,-67.3,33.2,-70,23.2C-72.7,13.1,-60.6,-1.3,-53.8,-15.9C-46.9,-30.5,-45.3,-45.3,-37.2,-52.5C-29.1,-59.7,-14.6,-59.4,-0.2,-59.1C14.1,-58.7,28.2,-58.5,41.3,-52.9Z" transform="translate(100 100) scale(1.21)" fill-rule="nonzero"/></g></svg>') 50% no-repeat`,
   },
   loginCard: {
      animation: '$slideRight ease-in 0.3s',
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: '#fff',
      width: '410px',
      padding: '2rem',
      position: 'relative'
   }
}));

export function RegistrationPage(props) {
   const classes = useStyles();
   const history = useHistory();
   const [response, setResponse] = useState(''); //ответ от сервера, по сути статус нашей формы. если не пуст, значит мы зарегались
   const [isLoading, setLoading] = useState(false);

   const backToLogin = () => {
      history.push('/login');
   }

   const registrationSubmitHandler = async (form) => {
      setLoading(true);
      const response = await fetch(config.apiPath + 'register', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 'email': form.email, 'password': form.password })
      });

      if (!response.ok) {
         setLoading(false);
         throw new Error('Ответ сети был не ok.');
      } else {
         setResponse('Регистрация завершена. На вашу почту отправлена ссылка для подтверждения.');
         setLoading(false);
      }
   }

   const emailValidate = (value) => {
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!emailRegex.test(value)) return 'Некорректный email';
      return undefined;
   }

   const passwordValidate = (value) => {
      if (!value || value.length < 6) return 'Пароль должен быть длиннее 5 символов';
      return undefined;
   }

   return <div className={classes.wrapper}>
      <div className={classes.loginCard}>
         {isLoading ? <div style={{position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', top: 0, left: 0, background: 'linear-gradient(46deg, #c7d2fe, transparent)'}}><span>Пожалуйста подождите...</span></div> : ''}

         <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
            <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
            <span>Bishop converter</span>
         </div>

         <h1 style={{ fontWeight: 600, fontSize: '1.6em', color: '#2B3044' }}>Регистрация</h1>

         {!response ? <Form onSubmit={registrationSubmitHandler}>
            {formProps => (
               <form onSubmit={formProps.handleSubmit}>

                  {formProps.submitFailed && Object.values(formProps.errors).length ? <Alert title="Ошибки заполнения:">{Object.values(formProps.errors).map(err => <div>{err}</div>)}</Alert> : ""}

                  <div style={{ margin: '10px 0px', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                     {JSON.stringify(formProps.values)}
                  </div>

                  <Field name="email" validate={emailValidate}>
                     {fieldProps => <Input placeholder="Эл.почта" {...fieldProps.input} />}
                  </Field>

                  <Field name="password" validate={passwordValidate}>
                     {fieldProps => <Input placeholder="Пароль" type="password" {...fieldProps.input} />}
                  </Field>

                  <Field name="passwordRepeat" validate={(val) => !val || formProps.values.password !== val ? 'Пароли не совпадают' : undefined}>
                     {fieldProps => <Input placeholder="Повторите пароль" type="password" {...fieldProps.input} />}
                  </Field>

                  <p>{response}</p>

                  <div style={{ marginTop: '10px' }}>
                     <Button type="submit" fullWidth>Зарегистрироваться</Button>
                     <Divider />
                  </div>

               </form>
            )}
         </Form> : <div style={{margin: '20px 0px', padding: '20px', background: '#fafffa', borderLeft: '5px solid #d4ffb3'}}>{response}</div>
         }

         <Button fullWidth onClick={backToLogin}>Назад ко входу</Button>

      </div>
   </div>
}

export default RegistrationPage;