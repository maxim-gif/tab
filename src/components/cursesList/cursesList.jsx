import "./cursesList.css";
import { useSelector } from "react-redux";
import { CursesSubscriber } from "../reload/curses";
import { addListCurses, DeleteFile } from "../../api";

export const CurseList = ({setMessage}) => {
  const curses = useSelector((state) => state.table.curses);

const deleteCurse = async(index,curseName) => {
    let newData = [...curses]
    newData.splice(index,1)
    const message = await addListCurses(newData)
    setMessage(message)
    DeleteFile(curseName,"icon")
    DeleteFile(curseName,"img")
}

  return (
    <div className="cursesList">
      <CursesSubscriber />
      <div className="titleAdmin">Список проклятий</div>
        {curses !== null &&
          curses?.map((item, index) => (
            <div className="itemList" key={index}>
              <span>{item.name}</span>
              <div className="curseItemDelete" onClick={() => {deleteCurse(index,item.name)}}></div>
            </div>
          ))}
      </div>
  );
};
