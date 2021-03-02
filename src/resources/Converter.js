import React from 'react';
import { Layout } from '../layout/Layout';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea/Textarea';

export function Converter(props) {
   return <Layout>
      <h2>Конвертация XML-фида в CSV</h2>

      <Label>
         <span>Удаление общего описания</span>
         <Textarea placeholder="Текст описания (можно оставить пустым)" />
      </Label>

      <Label>
         <span>Стоп-слова</span>
         <Input placeholder="Стоп-слова через запятую (можно оставить пустым)" />
      </Label>

      <Label>
         <span>Город</span>
         <Input placeholder="Новороссийске / Екатеринбурге / Москве" />
      </Label>

      <Label>
         <span>Текст после описания</span>
         <Input placeholder="Любой текст (можно оставить пустым)" />
      </Label>

      <Label>
         <Input type="checkbox" />
         <span style={{ verticalAlign: 'middle' }}>Удалять последнюю картинку</span>
      </Label>

      <Label>
         <Input type="checkbox" />
         <span style={{ verticalAlign: 'middle' }}>Исключить товары которых нет в наличии</span>
      </Label>

      <Button>Скачать</Button>

   </Layout>
}
export default Converter;