import "./cursesList.css";
import { useSelector } from "react-redux";
import { CursesSubscriber } from "../reload/curses";
import { addListCurses } from "../../api";

export const CurseList = ({setMessage}) => {
  const curses = useSelector((state) => state.table.curses);

const deleteCurse = async(index) => {
    let newData = [...curses]
    newData.splice(index,1)
    const message = await addListCurses(newData)
    setMessage(message)
}

  return (
    <div className="cursesList">
      <CursesSubscriber />
      <div className="titleAdmin">Список проклятий</div>
        {curses !== null &&
          curses?.map((item, index) => (
            <div className="itemList" key={index}>
              <span>{item.name}</span>
              <div className="curseItemDelete" onClick={() => {deleteCurse(index)}}></div>
            </div>
          ))}
      </div>
  );
};
