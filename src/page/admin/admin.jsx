import './admin.css';
import { useState, useEffect} from 'react'
import { GetModerators, sendModerator } from '../../api';
import { useSelector } from "react-redux";
import { ModeratorSubscriber } from '../../components/reload/moderator.js';
import { AddList } from "../../components/addCurse/addCurse.jsx";
import { CurseList } from '../../components/cursesList/cursesList.jsx';


export const Admin = () => {

  let dataModerators = useSelector((state) => state.table.moderators)
  const [moderators, setModerators] = useState([])
  const [name, setName] = useState('')



  useEffect(() => {
    handleGetModerators()
    }, []);

    useEffect(() => {
      setModerators(dataModerators)
     
      }, [dataModerators]);


  const handleGetModerators = async() => {
    const data = await GetModerators()
    if (data !== null) { 
      setModerators(data)
    }
  }


  const addModerator = () => {
    if (moderators === null) {
      sendModerator([name])
    } else {
      sendModerator([...moderators, name])
    }
    setName("")
  }

const deleteModerator = (index) => {
  const newModerators = [...moderators.slice(0, index), ...moderators.slice(index + 1)];
  sendModerator(newModerators)
}
 
  return (
   <div className="admin">
    <ModeratorSubscriber/>
    
         <div>
          <div className="moderators" style={{gridTemplateRows: `repeat(${moderators?.length+3 || 3}, 30px)`}}>
            <div className="titleMod">Модераторы</div>
            { moderators !== null && moderators?.map((item, index) => ((
                  <div className="moderator" key={index}>
                      <span>{item}</span>
                      <div className="deleteModerator" onClick={() => deleteModerator(index)}></div>
                  </div>)))
            }
            <input className="inputName" type='text' placeholder='Введите твич никнейм' value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <button className="buttonAddModerator" onClick={() => addModerator()}>Добавить модератора</button>  
          </div>
        </div>
        <CurseList/>
        <AddList/>
    </div>
  );
}
