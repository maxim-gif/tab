import "./list.css";
import React from "react";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../reload/updateAdmin";

export const SelectCurse = ({ handleAddCurse , id }) => {
  const admin = useSelector((state) => state.table.adminData);
  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"];
  const handleAdd = (curse) => {

    const findItem = admin.curses.find((item) => item.name === curse )

    if (findItem.general) {
     
        // handleAddCurse(curse, 0);
        // handleAddCurse(curse, 1);
        // handleAddCurse(curse, 2);
        handleAddCurse(curse, id);
     
    
    } else {
      handleAddCurse(curse, id);
    }
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
          <option key={index} value={item.name}  className={item.general ? 'general' : ''}>
            {item.name}
          </option>
        ))}
    </select>
  );
};
