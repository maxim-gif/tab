/* eslint-disable jsx-a11y/anchor-has-content */
import "./member.css";
import { SelectCurse } from "../list/list.js";
import { Member1Subscriber } from "../updateFunc/member1.js";
import { Member2Subscriber } from "../updateFunc/member2.js";
import { Member3Subscriber } from "../updateFunc/member3.js";
import { Member4Subscriber } from "../updateFunc/member4.js";
import { UncompletedSubscriber1 } from "../updateFunc/uncompleted1.js";
import { UncompletedSubscriber2 } from "../updateFunc/uncompleted2.js";
import { UncompletedSubscriber3 } from "../updateFunc/uncompleted3.js";
import { UncompletedSubscriber4 } from "../updateFunc/uncompleted4.js";
import {addCurse, addListUncompletedCurse } from "../../api";
import { useSelector } from "react-redux";
import { useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { setCursesActive } from "../../store/slice/slice.js";

export const Member = ({ id, moderatorsAccess, superModeratorsAccess, name, }) => {

  

  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"];
  const dispatch = useDispatch();

  const [focusCurse, setFocusCurse] = useState("");


  const curses = useSelector((state) => state.table.curses);
  const activeCurse = useSelector((state) => state.table.activeIdCurse);
  const dataMember1 = useSelector((state) => state.table.member1);
  const dataMember2 = useSelector((state) => state.table.member2);
  const dataMember3 = useSelector((state) => state.table.member3);
  const dataMember4 = useSelector((state) => state.table.member4);
  const dataUncompleted1 = useSelector((state) => state.table.uncompleted1);
  const dataUncompleted2 = useSelector((state) => state.table.uncompleted2);
  const dataUncompleted3 = useSelector((state) => state.table.uncompleted3);
  const dataUncompleted4 = useSelector((state) => state.table.uncompleted4);

  const list = [dataMember1, dataMember2, dataMember3, dataMember4];
  const listUn = [dataUncompleted1, dataUncompleted2, dataUncompleted3, dataUncompleted4];

  // useEffect(() => {
    
    if (dataMember1) {
console.log(1);
      let newUncompleted
      if (dataUncompleted1 === null) {
        newUncompleted = []
      } else {
       newUncompleted = [...dataUncompleted1]
      }
      const newData = [...dataMember1]
      const sort = [...new Set(newUncompleted)]
      console.log(sort);
      const getIndex = (name) => {
        const index = sort.indexOf(name);
        return index === -1 ? Infinity : index;
      }
      newData.sort((a, b) => getIndex(a.name) - getIndex(b.name));
      addCurse(0, newData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMember1]);
//   useEffect(() => {
    
//     if (dataMember4) {
// console.log(4);
//       let newUncompleted
//       if (dataUncompleted4 === null) {
//         newUncompleted = []
//       } else {
//        newUncompleted = [...dataUncompleted4]
//       }
//       const newData = [...dataMember4]
//       const sort = [...new Set(newUncompleted)]
//       console.log(sort);
//       const getIndex = (name) => {
//         const index = sort.indexOf(name);
//         return index === -1 ? Infinity : index;
//       }
//       newData.sort((a, b) => getIndex(a.name) - getIndex(b.name));
//       addCurse(3, newData);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataMember4]);
  useEffect(() => {
    
    if (list[id]) {

      let newUncompleted
      if (listUn[id] === null) {
        newUncompleted = []
      } else {
       newUncompleted = [...listUn[id]]
      }
      const newData = [...list[id]]
      const sort = [...new Set(newUncompleted)]
      console.log(sort);
      const getIndex = (name) => {
        const index = sort.indexOf(name);
        return index === -1 ? Infinity : index;
      }
      newData.sort((a, b) => getIndex(a.name) - getIndex(b.name));
      addCurse(id, newData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list[id]]);


  const handleAddUncompleted = (curse) => {
    
    console.log(curse);
    let newUncompletedCursesList
    if (listUn[id] === null) {
      newUnc = []
    } else {
      newUnc = [...listUn[id]]
    }
    newUnc.push(curse)

   addListUncompletedCurse(id,newUnc)
  }

  const handleAddCurse = async(curse, id) => {
    console.log(id);
    let newData;
    if (list[id] === null) {
      newData = [];
    } else {
      newData = [...new Set(list[id])]
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
console.log(id);
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
    const newArr = newData.map( item => {
      if (item.name === newData[index].name) {
        return { ...item, completedCounter: newData[index].completedCounter + 1 };
      }
      return item
    })
 
    addCurse(id, newArr);
  }

  const deleteCurseUncompleted = (curse) => {

    const newUnc = [...listUn[id]]

    const index = newUnc.indexOf(curse);
    if (index > -1) {
      newUnc.splice(index, 1);
    }
    addListUncompletedCurse(id,newUnc)
  }

  return (
    <div className="member">
       <Member1Subscriber />
      <Member2Subscriber />
       <Member3Subscriber />
      <Member4Subscriber />
      <UncompletedSubscriber1/>
      <UncompletedSubscriber2/>
      <UncompletedSubscriber3/>
     <UncompletedSubscriber4/>
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
            className="curse"
            style={{background:`linear-gradient(90deg, rgba(104,241,62,1) ${Math.round(100/item.totalCounter*item.completedCounter)}%, rgba(254,255,254,1) ${Math.round(100/item.totalCounter*item.completedCounter)}%)`}}
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
            { moderatorsAccess && item.totalCounter !== item.completedCounter && (
              <div
                className="done"
                onClick={() => {
                  completedCurseAdd(index);
                  deleteCurseUncompleted(item.name)
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
      {superModeratorsAccess && (
        <SelectCurse handleAddCurse={handleAddCurse} handleAddUncompleted={handleAddUncompleted} id={id} />
      )}
    </div>
  );
};
