import './addCurse.css';
import { useSelector } from "react-redux";
import { useState} from "react";
import { addListCurses } from '../../api';


export const AddList = ({setMessage}) => {

  const curses = useSelector((state) => state.table.curses);

  const [curseName, setCurseName] = useState("");
  const [curseTitle, setCurseTitle] = useState("");
  const [checked, setChecked] = useState(false);

  const addCurse = async() => {
    let newData 
    if (curses === null) {
      newData = []
    } else {
      newData = [...curses]
    }
    newData.push({name:curseName,title:curseTitle,general:checked})
    console.log(newData);
    const message = await addListCurses(newData)
    setCurseName("")
    setCurseTitle("")
    setMessage(message)
  }


  return (
   <div className="addList">
        <input type='text' className="inputAdmin" value={curseName} placeholder='Введите название проклятия' onChange={(e) => {setCurseName(e.target.value)}}></input>
        <textarea className="curseTitle" value={curseTitle} placeholder='Описане проклятия' onChange={(e) => {setCurseTitle(e.target.value)}}></textarea>
        <div className="checkBox">
          <input type="checkbox" id="check" className="check" checked={checked} onChange={(e) => setChecked(e.target.checked)}></input>
          <label for="check">Общее проклятие</label>
        </div>
        <button className="buttonAdmin" onClick={() => {addCurse()}}>Добавить проклятие</button>
    </div>
  );
}