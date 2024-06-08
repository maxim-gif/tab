import './admin.css';
import { AddList } from "../../components/addCurse/addCurse.jsx";
import { CurseList } from '../../components/cursesList/cursesList.jsx';
import { NameMembersList } from '../../components/nameMemberList/nameMemberList.jsx';
import { ModeratorList } from '../../components/moderators/moderators.jsx';
import { useState,useEffect} from "react";
import { Enter } from '../../api.js';


export const Admin = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const Auth = () => {
    Enter(email,password)
    setEmail('')
    setPassword("")
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("")
    },1000)
  }, [message]);

  return (
   <div className="admin">
    <div className="logo">  </div>
        <div className="auth">
          <input type='text' className="authInput" placeholder='Введити email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
          <input type='text' className="authInput" placeholder='Введите пароль' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
          <button className="authButton" onClick={() => {Auth()}}>Войти</button>
        </div>
        {message !== "" && <span className="message">{message}</span>}
        <div className="modContain">
          <ModeratorList setMessage={setMessage}/>
          <NameMembersList setMessage={setMessage}/>
          <CurseList setMessage={setMessage}/>
          <AddList setMessage={setMessage}/>
        </div>
        
        
    </div>
  );
}
