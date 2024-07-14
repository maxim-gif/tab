import { useSelector } from "react-redux";
import { UpdateAdmin } from "../reload/updateAdmin";
import { updateAdminData } from "../../api";
import { useState } from "react";

export const SupModeratorList = ({ setMessage }) => {
  let admin = useSelector((state) => state.table.adminData);
  const [name, setName] = useState("");

  const deleteModerator = async (index) => {
    let newData = [...admin.superModerators];
    newData.splice(index, 1);
    const message = await updateAdminData("superModerators/", newData);
    setMessage(message);
  };

  const addModerator = async () => {
    let newData;

    if (admin === null || admin.superModerators === undefined) {
      newData = [];
    } else {
      newData = [...admin.superModerators];
    }
    newData.push(name);
    const message = await updateAdminData("superModerators/", newData);
    setMessage(message);
    setName("");
  };

  return (
    <div className="moderators">
      <UpdateAdmin />
      <div className="titleAdmin">Супер модераторы</div>
      {admin !== null &&
        admin.superModerators?.map((item, index) => (
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
