import "./member.css";
import { SelectCurse } from "../list/list.js";
import { Member1Subscriber } from "../reload/member1.js";
import { Member2Subscriber } from "../reload/member2.js";
import { Member3Subscriber } from "../reload/member3.js";
import { Member4Subscriber } from "../reload/member4.js";
import { doneCurse,Delete,addCurse } from "../../api";
import { useSelector } from "react-redux";

export const Member = ({ id, moderatorsAccess, name }) => {

  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"]

  const curses = useSelector((state) => state.table.curses);
  const dataMember1 = useSelector((state) => state.table.member1);
  const dataMember2 = useSelector((state) => state.table.member2);
  const dataMember3 = useSelector((state) => state.table.member3);
  const dataMember4 = useSelector((state) => state.table.member4);

  const list  = [dataMember1,dataMember2,dataMember3,dataMember4]

  const deleteCurse = (index) => {
    let newData
    if (id === 0) newData = [...dataMember1]
    if (id === 1) newData = [...dataMember2]
    if (id === 2) newData = [...dataMember3]
    if (id === 3) newData = [...dataMember4]
    
    newData.splice(index,1)
    Delete(id,newData)
  }

  const handleAddCurse = (curse,id) => {
    let newData
    if (list[id] === null) {
      newData = []
    } else {
      newData = [...list[id]]
    }
    const findItem = curses.filter((item) => item.name === curse)
    newData.push(findItem[0])
    addCurse(id,newData)
    document.getElementById(selectElement[id]).value = "";
  }



  
  return (
    <div className="member">
      {id === 0 && <Member1Subscriber />}
      {id === 1 && <Member2Subscriber />}
      {id === 2 && <Member3Subscriber />}
      {id === 3 && <Member4Subscriber />}
      <div className="memberName">{name}</div>
      <div
        className="curseList"
        style={{ gridTemplateRows: `repeat(5, 25px)` }}
      >
        {list[id]?.map((item, index) => (
          <div
            title={item.title}
            key={index}
            className={item.status ? "curseDone" : "curse"}
          >
            <span>{item.name}</span>
            {moderatorsAccess && <div className="done" onClick={() => {doneCurse(id,index,!item.status)}}></div>}
            {moderatorsAccess && <div className="delete" onClick={() => {deleteCurse(index)}}></div>}
          </div>
        ))}
      </div>
      {moderatorsAccess && (
        <SelectCurse handleAddCurse={handleAddCurse} id={id} />
      )}
    </div>
  );
};
