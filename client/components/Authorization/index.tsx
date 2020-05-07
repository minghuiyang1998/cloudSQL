import React from 'react';
import style from './index.scss';
import Form from '../../components/Form';

const Authorization = () => (
  <div className="flex">
    <style jsx>{style}</style>
    <Form inputList={['usename', 'password']} action="http://127.0.0.1:3000/signin" />
  </div>
);

export default Authorization;
