import React from "react";
import './auth.css';
import {useEffect, useState} from 'react'
import { getToken, getUserData, addUser } from "../../api";
// import { useNavigate } from 'react-router-dom'


export const Auth = () => {

    // const navigate = useNavigate()
    const [hello, setHello] = useState('')
  

    useEffect(() => {
  if (document.location.href !== "http://localhost:3000/auth") {
    auth()
  } 
    }, []);

    const auth = async() => {
      const hash = document.location.href
      const splitHash = hash.split('&')[0]
      const code = splitHash.split('=')[1]
      const token = await getToken(code)
      console.log(token);
      const userData = await getUserData(token.access_token)
      console.log(userData === undefined ? null:userData[0]);
      if (userData !== undefined) {
        addUser(userData[0].id,userData[0].login)
        setHello(userData[0].login)
      }
      
    }

  return (
    <div className="contain">
        <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=9tme6blew754pa56v75lf5mgqg0iro&redirect_uri=http://localhost:3000/auth" >
          <div className="twitch"></div>
        </a>
        {hello !== "" && <span>Пользавтель {hello} успешно зарегистрировался</span>}
    </div>
  );
};