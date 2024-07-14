import "./list.css";
import React from "react";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../reload/updateAdmin";

export const SelectCurse = ({ handleAddCurse , id }) => {
  const admin = useSelector((state) => state.table.adminData);
  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"];
  const handleAdd = (curse) => {
    handleAddCurse(curse, id);
    // handleAddUncompleted(curse);
  };
  return (
    <select
      id={selectElement[id]}
      className="listCurse"
      onChange={(e) => {
        handleAdd(e.target.value, id);
      }}
    >
      <UpdateAdmin />
      <option value="">Добавить проклятие</option>
      {admin.curses !== null &&
        admin.curses?.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};
