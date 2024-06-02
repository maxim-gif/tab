import React from "react";
import './auth.css';
import { useState} from 'react'
import { GetAuth } from "../../api";


export const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const reg = () => {
        console.log(email);
        console.log(password);
        GetAuth(email,password)
    }
  return (
    <div className="contain">
        <input type="text" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}></input>
        <input type="text" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}></input>
        <button onClick={() => {reg()}}>Регистрация</button>
    </div>
  );
};