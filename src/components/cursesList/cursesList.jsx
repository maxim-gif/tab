import "./cursesList.css";
import { useSelector } from "react-redux";
import { CursesSubscriber } from "../reload/curses";

export const CurseList = () => {
  const curses = useSelector((state) => state.table.curses);
  return (
    <div className="cursesList">
      <CursesSubscriber />
      <div className="titleCurses">Список проклятий</div>
        {curses !== null &&
          curses?.map((item, index) => (
            <div className="curseItem" key={index}>
              <span>{item.name}</span>
            </div>
          ))}
      </div>
  );
};
