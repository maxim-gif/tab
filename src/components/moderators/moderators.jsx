import "./moderators.css";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../reload/updateAdmin";
import { updateAdminData } from "../../api";
import { useState } from "react";

export const ModeratorList = ({ setMessage }) => {

  const admin = useSelector((state) => state.table.adminData);
  const [name, setName] = useState("");

  const deleteModerator = async (index) => {
    let newData = [...admin.moderators];
    newData.splice(index, 1);
    const message = await updateAdminData("moderators/", newData);
    setMessage(message);
  };

  const addModerator = async () => {
    let newData;
    if (admin === null || admin.moderators === undefined) {
      newData = [];
    } else {
      newData = [...admin.moderators];
    }
    newData.push(name);
    const message = await updateAdminData("moderators/", newData);
    setMessage(message);
    setName("");
  };

  return (
    <div className="moderators">
      <UpdateAdmin />
      <div className="titleAdmin">Модераторы</div>
      {admin !== null &&
        admin.moderators?.map((item, index) => (
          <div className="itemList" key={index}>
            <span>{item}</span>
            <div
              className="deleteModerator"
              onClick={() => deleteModerator(index)}
            ></div>
          </div>
        ))}
      <input
        className="inputAdmin"
        type="text"
        placeholder="Введите твич никнейм"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button className="buttonAdmin" onClick={() => addModerator()}>
        Добавить модератора
      </button>
    </div>
  );
};
