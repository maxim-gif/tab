import './list.css';
import React from "react";
import { useSelector } from "react-redux";
import { CursesSubscriber } from '../reload/curses';


export const SelectCurse = ({handleAddCurse,handleAddUncompleted, id}) => {

  const curses = useSelector((state) => state.table.curses);
  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"]
  const handleAdd = (curse) => {
    handleAddCurse(curse)
    handleAddUncompleted(curse)
  }
  return (
    <select id={selectElement[id]} className="listCurse" onChange={(e) => {handleAdd(e.target.value, id)}}>
      <CursesSubscriber />
        <option value="">Добавить проклятие</option>
        { curses !== null && curses?.map((item, index) => ((
                  <option key={index} value={item.name}>{item.name}</option>
                )))
          }
    </select>
  );
};