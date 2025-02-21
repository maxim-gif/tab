import './admin.css';
import { AddList } from "../../components/addCurse/addCurse.jsx";
import { CurseList } from '../../components/cursesList/cursesList.jsx';
import { NameMembersList } from '../../components/nameMemberList/nameMemberList.jsx';
import { ModeratorList } from '../../components/moderators/moderators.jsx';
import { HistoryAdd } from '../../components/historyAdd/historyAdd.jsx';
import { SupModeratorList } from '../../components/superModerators/supModerators.jsx';
import { ConditionsAdd } from '../../components/victoryConditions/victoryConditions.jsx';
import { useState,useEffect} from "react";
import { Enter } from '../../api.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const Admin = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [switchElement, setSwitchElement] = useState(1);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
 
  });

  const Auth = async() => {
    const response = await Enter(email,password)
    if (response.uid) {
      console.log(response.uid);
      setMessage("Вход выполнен успешно")
    } else {
      setMessage("Ошибка авторизации")
    }
    setEmail('')
    setPassword("")
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("")
    },1500)
  }, [message]);

  return (
   <div className="admin">
    <div className="logo">  </div>
        <div className="auth">
          <img className="switch" src='/arrow.svg' alt='' style={{opacity:switchElement === 1 ? "0":"1"}} onClick={() => setSwitchElement(1)}></img>
          <input type='text' className="authInput" placeholder='Введити email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
          <input type='text' className="authInput" placeholder='Введите пароль' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
          <button className="authButton" onClick={() => {Auth()}}>Войти</button>
          <img className="switch" src='/arrow.svg' alt='' style={{rotate:"180deg", opacity:switchElement === 2 ? "0":"1"}} onClick={() => setSwitchElement(2)}></img>
        </div>
        {message !== "" && <span className="message">{message}</span>}
        {message === "" &&<span className="message"></span>}
        <div className="modContain">
          {switchElement === 1 && <ModeratorList setMessage={setMessage}/>}
          {switchElement === 1 && <SupModeratorList setMessage={setMessage}/>}
          {switchElement === 1 && <NameMembersList setMessage={setMessage} auth={auth}/>}
          {switchElement === 1 && <CurseList setMessage={setMessage}/>}
          {switchElement === 1 && <AddList setMessage={setMessage}/>}
          {switchElement === 2 && <HistoryAdd/>}
          {switchElement === 2 && <ConditionsAdd/>}
        </div>
    </div>
  );
}
