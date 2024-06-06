import "./cursesList.css";
import { useSelector } from "react-redux";
import { CursesSubscriber } from "../reload/curses";
import { addListCurses } from "../../api";

export const CurseList = () => {
  const curses = useSelector((state) => state.table.curses);

const deleteCurse = (index) => {
    let newData = [...curses]
    newData.splice(index,1)
    addListCurses(newData)
}

  return (
    <div className="cursesList">
      <CursesSubscriber />
      <div className="titleCurses">Список проклятий</div>
        {curses !== null &&
          curses?.map((item, index) => (
            <div className="curseItem" key={index}>
              <span>{item.name}</span>
              <div className="curseItemDelete" onClick={() => {deleteCurse(index)}}></div>
            </div>
          ))}
      </div>
  );
};
