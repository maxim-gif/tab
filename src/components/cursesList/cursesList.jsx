import './cursesList.css';
import { useSelector } from "react-redux";
import { CursesSubscriber } from '../reload/curses';


export const CurseList = () => {

  const curses = useSelector((state) => state.table.curses);


  return (
   <div className="curseList">
    <CursesSubscriber/>
   { curses !== null && curses?.map((item, index) => ((
                  <div className="curse" key={index}>
                      <span>{item.name}</span>
                  </div>)))
            }
    </div>
  );
}