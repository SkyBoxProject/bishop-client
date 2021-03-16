import React from 'react';
import { Layout } from '../layout/Layout';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../providers/AuthProvider';
import { Form, Field } from 'react-final-form';
import { config } from '../config';

export function Settings() {
   const auth = useAuth();

   const changeEmail = async (form) => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + 'user/change-email', {
         method: 'POST',
         headers: {
            'authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(form)
      });
      if (!response.ok) return;
   }

   const changePassword = async (form) => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + 'user/change-password', {
         method: 'POST',
         headers: {
            'authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(form)
      });
      if (!response.ok) return;
   }

   return <Layout>
      <h2>Настройки</h2>

      <h3>Смена электронной почты</h3>
      <div style={{ marginBottom: '15px', fontSize: '0.85em' }}>Текущий адрес: {auth.userInfo && auth.userInfo.email}</div>

      <Form onSubmit={changeEmail}>
         {formProps => (
            <form onSubmit={formProps.handleSubmit}>

               <Field name="email">
                  {fieldProps => (
                     <Label>
                        <span>Введите новый адрес эл.почты</span>
                        <Input {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Button type="submit">Сменить почту</Button>
            </form>
         )}
      </Form>



      <h3>Смена пароля учетной записи</h3>

      <Form onSubmit={changePassword}>
         {formProps => (
            <form onSubmit={formProps.handleSubmit}>

               <Field name="password">
                  {fieldProps => (
                     <Label>
                        <span>Введите старый пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="newPassword">
                  {fieldProps => (
                     <Label>
                        <span>Введите новый пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="newPasswordConfirmed">
                  {fieldProps => (
                     <Label>
                        <span>Повторите новый пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Button type="submit">Сменить пароль</Button>
            </form>
         )}
      </Form>

   </Layout>;
}
export default Settings;