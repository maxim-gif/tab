/* eslint-disable jsx-a11y/anchor-has-content */
import "./member.css";
import { SelectCurse } from "../list/list.js";
import { Member1Subscriber } from "../reload/member1.js";
import { Member2Subscriber } from "../reload/member2.js";
import { Member3Subscriber } from "../reload/member3.js";
import { Member4Subscriber } from "../reload/member4.js";
import { doneCurse, Delete, addCurse } from "../../api";
import { useSelector } from "react-redux";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { setCursesActive } from "../../store/slice/slice.js";

export const Member = ({ id, moderatorsAccess, name, }) => {

  

  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"];
  const dispatch = useDispatch();

  const [focusCurse, setFocusCurse] = useState("");


  const curses = useSelector((state) => state.table.curses);
  const activeCurse = useSelector((state) => state.table.activeIdCurse);
  const dataMember1 = useSelector((state) => state.table.member1);
  const dataMember2 = useSelector((state) => state.table.member2);
  const dataMember3 = useSelector((state) => state.table.member3);
  const dataMember4 = useSelector((state) => state.table.member4);

  const list = [dataMember1, dataMember2, dataMember3, dataMember4];



  const deleteCurse = (index) => {
    let newData;
    if (id === 0) newData = [...dataMember1];
    if (id === 1) newData = [...dataMember2];
    if (id === 2) newData = [...dataMember3];
    if (id === 3) newData = [...dataMember4];

    newData.splice(index, 1);
    Delete(id, newData);
  };

  const handleAddCurse = (curse, id) => {
    let newData;
    if (list[id] === null) {
      newData = [];
    } else {
      newData = [...list[id]];
    }
    const findItem = curses.filter((item) => item.name === curse);
    let newItem = {...findItem[0]}
    const indexElement = newData.findIndex (item => item.name === curse)
    if (indexElement !== -1) {
     const newArr = newData.map( item => {
        if (item.name === curse) {
          return { ...item, totalCounter: newData[indexElement].totalCounter + 1 };
        }
        return item
      })
      addCurse(id, newArr);
    } else {
      newItem.completedCounter = 0
      newItem.totalCounter = 1
      newData.push(newItem);
      addCurse(id, newData);
    }
    console.log(newData);
    document.getElementById(selectElement[id]).value = "";
  };

  const showDescription = (e, index) => {
    const rez = curses.filter((item) => item.name === index);
    setFocusCurse(rez);
    dispatch(setCursesActive(name));
  };

  const closeDescription = () => {
    dispatch(setCursesActive(""));
    setFocusCurse("");
  };

  const completedCurseAdd = (index) => {
    let newData = [...list[id]]
    console.log(newData[index].name);
    const newArr = newData.map( item => {
      if (item.name === newData[index].name) {
        return { ...item, completedCounter: newData[index].completedCounter + 1 };
      }
      return item
    })
    addCurse(id, newArr);
  }

  return (
    <div className="member">
      {id === 0 && <Member1Subscriber />}
      {id === 1 && <Member2Subscriber />}
      {id === 2 && <Member3Subscriber />}
      {id === 3 && <Member4Subscriber />}
      {activeCurse === name && (
        <div className="popUp"  onClick={() => {closeDescription();}}>
          <div
            className="description"
            // style={{
            //   left: `${cursorPosX}px`,
            //   top: `${cursorPosY <= 540 ? `${cursorPosY}px` : '50%' }`,
            // }}
          >
            <h2>{focusCurse[0].name}</h2>
            <span>{focusCurse[0].title}</span>
            {/* {focusCurse[0].image && (
              <div>
                {focusCurse[0].image.img && (
                  <img
                    className="descriptionImg"
                    src={focusCurse[0].image.img}
                    alt=""
                  ></img>
                )}
              </div>
            )} */}
          </div>
        </div>
      )}
      <div className="memberName">
        <span className="linkName">
          {name ? name : "Участник"}
          <a
            className="link1"
            href={"https://www.twitch.tv/" + name?.split(" & ")[0]}
          ></a>
          {name?.split(" & ")[1] && (
            <a
              className="link2"
              href={"https://www.twitch.tv/" + name?.split(" & ")[1]}
            ></a>
          )}
        </span>
      </div>
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
            <span
              onClick={(e) => {
                showDescription(e, item.name);
              }}
            >
              {item.name} {item.completedCounter}/{item.totalCounter}
              {item?.image?.icon && (
                <img className="curseIcon" src={item.image.icon} alt=""></img>
              )}
            </span>
            {moderatorsAccess && item.totalCounter !== item.completedCounter && (
              <div
                className="done"
                onClick={() => {
                  completedCurseAdd(index);
                }}
              ></div>
            )}
            {moderatorsAccess && item.totalCounter !== item.completedCounter && (
              <div
                className="delete"
                onClick={() => {
                  deleteCurse(index);
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
      {moderatorsAccess && (
        <SelectCurse handleAddCurse={handleAddCurse} id={id} />
      )}
    </div>
  );
};
