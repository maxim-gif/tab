import "./victoryConditions.css";
import { useSelector } from "react-redux";
import { addDataHistory } from "../../api.js";
import { useState } from "react";
import { updateAdminData } from "../../api";

export const ConditionsAdd = () => {

    let admin = useSelector((state) => state.table.adminData);
    const [counterConditions, setCounterConditions] = useState(admin.conditions || ['']);
    const [gameName, setGameName] = useState(admin.gameName || '');

    const handleChange = (event,index) => {
        let newArr = [...counterConditions]
        newArr[index] = event.target.value
        setCounterConditions(newArr)
      };

const saveConditions = async() => {
    await updateAdminData("conditions/", counterConditions)
    await updateAdminData("gameName/", gameName)
}

  return (
    <div className="conditionsAdd">
        <input type="text" placeholder="Введите название игры" className="inputAdmin" value={gameName} onChange={(e) => {setGameName(e.target.value)}}/>
        <span>Условия победы:</span>
        {counterConditions.map((item, index) => (
            <textarea key={index} name="" id="" className="conditionsVic" value={counterConditions[index]} onChange={(e) => handleChange(e,index)}></textarea>
        ))}
        <div className="conditionsButtons">
        <button className="buttonAdmin" onClick={() => setCounterConditions([...counterConditions,""])}>Добавить</button>
        <button className="buttonAdmin" onClick={() => setCounterConditions(counterConditions.slice(0,counterConditions.length-1))} disabled = {counterConditions.length === 1}>Убрать</button>
        </div>
        <button className="buttonAdmin" onClick={() => saveConditions()}>Сохранить</button>
    </div>
  );
};