import "./cursesList.css";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../reload/updateAdmin";
import { updateAdminData, DeleteFile } from "../../api";

export const CurseList = ({ setMessage }) => {
  let admin = useSelector((state) => state.table.adminData);

  const deleteCurse = async (index, curseName) => {
    let newData = [...admin.curses];
    newData.splice(index, 1);
    const message = await updateAdminData("curses/", newData);
    setMessage(message);
    DeleteFile(curseName, "icon");
    DeleteFile(curseName, "img");
  };

  return (
    <div className="cursesList">
      <UpdateAdmin />
      <div className="titleAdmin">Список проклятий</div>
      {admin.curses !== null &&
        admin.curses?.map((item, index) => (
          <div className="itemList" key={index}>
            <span>{item.name}</span>
            <div
              className="curseItemDelete"
              onClick={() => {
                deleteCurse(index, item.name);
              }}
            ></div>
          </div>
        ))}
    </div>
  );
};
