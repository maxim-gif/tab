/* eslint-disable jsx-a11y/anchor-has-content */
import "./participants.css";
import { useSelector } from "react-redux";
import { SelectCurse } from "../list/list.js";
import { updateParticipantData } from "../../api";
import { UpdateParticipant } from "../reload/updateParticipant.js";
import { useState, useEffect} from "react";

export const Participants = ({name}) => {

  const admin = useSelector((state) => state.table.adminData);
  const participant = useSelector((state) => state.table.participantData);


  const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"];
  const [focusCurse, setFocusCurse] = useState();
  const [moderatorsAccess, setModeratorsAccess] = useState(false);
  const [superModeratorsAccess, setSuperModeratorsAccess] = useState(false);

  // useEffect(() => {
  //   console.log(name);
    
  //   if (admin.moderators !== undefined) {
  //     console.log(admin.moderators.includes(name));
  //     setModeratorsAccess(admin.moderators.includes(name));
  //   } else {
  //     setModeratorsAccess(false);
  //   }

  // }, [admin.moderators, name,moderatorsAccess]);

  useEffect(() => {
    if (admin.superModerators !== undefined) {
      if (admin.superModerators.includes(name)) {
        setModeratorsAccess(true);
        setSuperModeratorsAccess(true);
      } else {
        if (admin.moderators !== undefined) {
          setModeratorsAccess(admin.moderators.includes(name));
        }
        setSuperModeratorsAccess(false);
      }
    }
  }, [admin.superModerators, admin.moderators, name]);

  const handleAddCurse = async (curse, id) => {
    let newUncompletedCursesList;
    if (
      participant === null ||
      participant[id]?.uncompletedCursesList === undefined
    ) {
      newUncompletedCursesList = [];
    } else {
      newUncompletedCursesList = [
        ...participant[id]?.uncompletedCursesList,
      ];
    }
    newUncompletedCursesList.push(curse)
    updateParticipantData(`${id}/uncompletedCursesList`, newUncompletedCursesList);

    let newData;
    if (participant === null || participant[id]?.curses === undefined) {
      newData = [];
    } else {
      newData = [...new Set(participant[id].curses)];
    }

    const findItem = admin.curses.filter((item) => item.name === curse);
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
      updateParticipantData(`${id}/curses`, newArr);
    } else {
      newItem.completedCounter = 0;
      newItem.totalCounter = 1;
      newData.push(newItem);
      updateParticipantData(`${id}/curses`, newData);
    }
    document.getElementById(selectElement[id]).value = "";
  };

  const completedCurseAdd = (index,indexCurse) => {

    let newData = [...participant[index].curses]
    const newArr = newData.map( item => {
      if (item.name === newData[indexCurse].name) {
        return { ...item, completedCounter: newData[indexCurse].completedCounter + 1 };
      }
      return item
    })
    updateParticipantData(`${index}/curses`, newArr);

    const newUncompletedCursesList = [...participant[index]?.uncompletedCursesList]
    const indexItem = newUncompletedCursesList.indexOf(participant[index].curses[indexCurse].name);
    if (indexItem > -1) {
        newUncompletedCursesList.splice(indexItem, 1);
    }
    updateParticipantData(`${index}/uncompletedCursesList`, newUncompletedCursesList);
  }

  const showDescription = (e, index) => {
    const rez = admin.curses.filter((item) => item.name === index);
    setFocusCurse(rez);
    console.log(rez);
  };

  const closeDescription = () => {
    setFocusCurse("");
  };



  return (
    <div className="participants">
    {focusCurse && (
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
      <UpdateParticipant />
      {admin.listMember &&
        admin.listMember.map((name, index) => (
          <div key={index}>
            <div className="memberName">
              <span className="linkName">
                {name}
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
              {participant &&
                participant[index]?.curses?.map((item, indexCurse) => (
                  <div
                    title={item.title}
                    key={indexCurse}
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
                        <img
                          className="curseIcon"
                          src={admin.curses.find(curse => curse.name === item.name).image.icon}
                          alt=""
                        ></img>
                      )}
                    </span>
                    {moderatorsAccess && item.totalCounter !== item.completedCounter && (
                      <div
                        className="done"
                        onClick={() => {
                            completedCurseAdd(index,indexCurse);
                        }}
                      ></div>
                    )}
                  </div>
                ))}
            </div>
            {superModeratorsAccess && <SelectCurse
              handleAddCurse={handleAddCurse}
              //   handleAddUncompleted={handleAddUncompleted}
              id={index}
            />}
          </div>
        ))}
    </div>
  );
};
