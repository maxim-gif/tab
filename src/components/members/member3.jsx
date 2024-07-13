/* eslint-disable jsx-a11y/anchor-has-content */
import "./member.css";
import { SelectCurse } from "../list/list.js";
import { Member3Subscriber } from "../reload/member3.js";
import { UncompletedSubscriber3 } from "../reload/uncompleted3.js";
import { addCurse, addListUncompletedCurse } from "../../api.js";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


export const Member3 = ({ moderatorsAccess, superModeratorsAccess, name }) => {



  const [focusCurse, setFocusCurse] = useState("");
  const [activeCurse, setActiveCurse] = useState("");

  const curses = useSelector((state) => state.table.curses);

  const dataMember3 = useSelector((state) => state.table.member3);

  const dataUncompleted3 = useSelector((state) => state.table.uncompleted3);

  useEffect(() => {
    if (dataMember3) {
      let newUncompleted;
      if (dataUncompleted3 === null) {
        newUncompleted = [];
      } else {
        newUncompleted = [...dataUncompleted3];
      }
      const newData = [...dataMember3];
      const sort = [...new Set(newUncompleted)];
      const getIndex = (name) => {
        const index = sort.indexOf(name);
        return index === -1 ? Infinity : index;
      };
      newData.sort((a, b) => getIndex(a.name) - getIndex(b.name));
      addCurse(2, newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMember3]);

  
  const handleAddUncompleted = (curse) => {
    let newUnc;
    if (dataUncompleted3 === null) {
      newUnc = [];
    } else {
      newUnc = [...dataUncompleted3];
    }
    newUnc.push(curse);

    addListUncompletedCurse(2, newUnc);
  };

  const handleAddCurse = async (curse) => {
    let newData;
    if (dataMember3 === null) {
      newData = [];
    } else {
      newData = [...dataMember3];
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
      addCurse(2, newArr);
    } else {
      newItem.completedCounter = 0;
      newItem.totalCounter = 1;
      newData.push(newItem);
      addCurse(2, newData);
    }

    document.getElementById("mySelect3").value = "";
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
    let newData = [...dataMember3];
    const newArr = newData.map((item) => {
      if (item.name === newData[index].name) {
        return {
          ...item,
          completedCounter: newData[index].completedCounter + 1,
        };
      }
      return item;
    });

    addCurse(2, newArr);
  };

  const deleteCurseUncompleted = (curse) => {
    const newUnc = [...dataUncompleted3];

    const index = newUnc.indexOf(curse);
    if (index > -1) {
      newUnc.splice(index, 1);
    }
    addListUncompletedCurse(2, newUnc);
  };

  return (
    <div className="member">
      <Member3Subscriber/>
      <UncompletedSubscriber3/>
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
        {dataMember3?.map((item, index) => (
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
         id={2}
       />
      }
    </div>
  );
};