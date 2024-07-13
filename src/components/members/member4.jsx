/* eslint-disable jsx-a11y/anchor-has-content */
import "./member.css";
import { SelectCurse } from "../list/list.js";
import { Member4Subscriber } from "../reload/member4.js";
import { UncompletedSubscriber4 } from "../reload/uncompleted4.js";
import { addCurse, addListUncompletedCurse } from "../../api.js";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


export const Member4 = ({ moderatorsAccess, superModeratorsAccess, name }) => {



  const [focusCurse, setFocusCurse] = useState("");
  const [activeCurse, setActiveCurse] = useState("");

  const curses = useSelector((state) => state.table.curses);

  const dataMember4 = useSelector((state) => state.table.member4);

  const dataUncompleted4 = useSelector((state) => state.table.uncompleted4);

  useEffect(() => {
   
    if (dataMember4) {
      let newUncompleted;
      if (dataUncompleted4 === null) {
        newUncompleted = [];
      } else {
        newUncompleted = [...dataUncompleted4];
      }
      const newData = [...dataMember4];
      const sort = [...new Set(newUncompleted)];
      const getIndex = (name) => {
        const index = sort.indexOf(name);
        return index === -1 ? Infinity : index;
      };
      newData.sort((a, b) => getIndex(a.name) - getIndex(b.name));
      addCurse(3, newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMember4]);

  
  const handleAddUncompleted = (curse) => {
    let newUnc;
    if (dataUncompleted4 === null) {
      newUnc = [];
    } else {
      newUnc = [...dataUncompleted4];
    }
    newUnc.push(curse);

    addListUncompletedCurse(3, newUnc);
  };

  const handleAddCurse = async (curse) => {
    let newData;
    if (dataMember4 === null) {
      newData = [];
    } else {
      newData = [...dataMember4];
    }
    const findItem = curses.filter((item) => item.name === curse);
    let newItem = { ...findItem[0] };
    const indexElement = newData.findIndex((item) => item.name === curse);
    if (indexElement !== -1) {
      const newArr = newData.map((item) => {
        if (item.name === curse) {
          return {
            ...item,
            totalCounter: newData[indexElement].totalCounter + 1,
          };
        }
        return item;
      });
      addCurse(3, newArr);
    } else {
      newItem.completedCounter = 0;
      newItem.totalCounter = 1;
      newData.push(newItem);
      addCurse(3, newData);
    }

    document.getElementById("mySelect4").value = "";
  };

  const showDescription = (e, index) => {
    const rez = curses.filter((item) => item.name === index);
    setFocusCurse(rez);
    setActiveCurse(name)
  };

  const closeDescription = () => {

    setFocusCurse("");
    setActiveCurse("")
  };

  const completedCurseAdd = (index) => {
    let newData = [...dataMember4];
    const newArr = newData.map((item) => {
      if (item.name === newData[index].name) {
        return {
          ...item,
          completedCounter: newData[index].completedCounter + 1,
        };
      }
      return item;
    });

    addCurse(3, newArr);
  };

  const deleteCurseUncompleted = (curse) => {
    const newUnc = [...dataUncompleted4];

    const index = newUnc.indexOf(curse);
    if (index > -1) {
      newUnc.splice(index, 1);
    }
    addListUncompletedCurse(3, newUnc);
  };

  return (
    <div className="member">
      <Member4Subscriber/>
      <UncompletedSubscriber4 />
      {activeCurse === name && (
        <div
          className="popUp"
          onClick={() => {
            closeDescription();
          }}
        >
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
        {dataMember4?.map((item, index) => (
          <div
            title={item.title}
            key={index}
            className="curse"
            style={{
              background: `linear-gradient(90deg, rgba(104,241,62,1) ${Math.round(
                (100 / item.totalCounter) * item.completedCounter
              )}%, rgba(254,255,254,1) ${Math.round(
                (100 / item.totalCounter) * item.completedCounter
              )}%)`,
            }}
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
                    deleteCurseUncompleted(item.name);
                    completedCurseAdd(index);
                }}
              ></div>
            )}
            {/* {moderatorsAccess &&(
              <div
                className="delete"
                onClick={() => {
                  deleteCurse(index);
                }}
              ></div>
            )} */}
          </div>
        ))}
      </div>
      {superModeratorsAccess &&
         <SelectCurse
         handleAddCurse={handleAddCurse}
         handleAddUncompleted={handleAddUncompleted}
         id={3}
       />
      }
    </div>
  );
};