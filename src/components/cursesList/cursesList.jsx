import "./cursesList.css";
import { useSelector } from "react-redux";
import { CursesSubscriber } from "../reload/curses";
import { addListCurses, DeleteFile } from "../../api";

export const CurseList = ({setMessage}) => {
  const curses = useSelector((state) => state.table.curses);

const deleteCurse = async(index,curseName,names) => {
    let newData = [...curses]
    newData.splice(index,1)
    const message = await addListCurses(newData)
    setMessage(message)
    console.log(names);
    if (names) {
      names.filter((item) => (
        DeleteFile(curseName,item)
      ))
    }
   

}

  return (
    <div className="cursesList">
      <CursesSubscriber />
      <div className="titleAdmin">Список проклятий</div>
        {curses !== null &&
          curses?.map((item, index) => (
            <div className="itemList" key={index}>
              <span>{item.name}</span>
              <div className="curseItemDelete" onClick={() => {deleteCurse(index,item.name,item.imagesName)}}></div>
            </div>
          ))}
      </div>
  );
};
