import './addCurse.css';
import { useSelector } from "react-redux";
import { useState} from "react";
import { addListCurses } from '../../api';


export const AddList = () => {

  const curses = useSelector((state) => state.table.curses);

  const [curseName, setCurseName] = useState("");
  const [curseTitle, setCurseTitle] = useState("");

  const addCurse = () => {
    let newData 
    console.log(curses);
    if (curses === null) {
      newData = []
    } else {
      newData = [...curses]
    }
    newData.push({name:curseName,title:curseTitle})
    addListCurses(newData)
    setCurseName("")
    setCurseTitle("")
  }


  return (
   <div className="addList">
        <input type='tet' className="inputAdmin" value={curseName} placeholder='Введите название проклятия' onChange={(e) => {setCurseName(e.target.value)}}></input>
        <textarea className="curseTitle" value={curseTitle} placeholder='Описане проклятия' onChange={(e) => {setCurseTitle(e.target.value)}}></textarea>
        <button className="buttonAdmin" onClick={() => {addCurse()}}>Добавить проклятие</button>
    </div>
  );
}