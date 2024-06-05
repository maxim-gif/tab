import './list.css';
import React from "react";


export const SelectCurse = ({handleAddCurse, id}) => {
    const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"]
  return (
    <select id={selectElement[id]} className="listCurse" onChange={(e) => {handleAddCurse(e.target.value, id)}}>
        <option value="">Добавить проклятие</option>
        <option value="Мутант">Мутант</option>
        <option value="Кузнец">Кузнец</option>
        <option value="Мимик">Мимик</option>
        <option value="Обжора">Обжора</option>
    </select>
  );
};