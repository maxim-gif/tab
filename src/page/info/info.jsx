import './info.css';
import { useSelector } from "react-redux";



export const Info = () => {

    let curses = useSelector((state) => state.table.curses);
    const chance = 100/curses.length
  return (
    <div className="info">
        <div className="containInfo">
                { curses !== null && curses?.map((item, index) => ((
                    <div className="infoItem" key={index}>
                      <img className="itemImg" src="/bgCurse.png" alt=''></img>
                        <h2>{item.name}</h2>
                        <span>{item.title}</span>
                    </div>)))
                }
            </div>
    </div>
  );
}
