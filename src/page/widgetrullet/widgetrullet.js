import "./widgetrullet.css";
import { useEffect, useState } from "react";
import {
  updateParticipantData,
  updatePriorityData,
  updateWidgetData,
  updateWidgetCurses
} from "../../api";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../../components/reload/updateAdmin";
import { UpdatePriority } from "../../components/reload/updatePriority";
import { UpdateParticipant } from "../../components/reload/updateParticipant";
import { UpdateWidgetData } from "../../components/reload/updateWidgetData";
import { UpdateWidgetCurses } from "../../components/reload/updateWidgetCurses";
import random from "lodash/random";

export const Widgetrullet = () => {
  const [base, setBase] = useState([0, 1, 2, 3, 0, 1, 2, 3]);
  const [newCurses, setNewCurses] = useState(null);
  const [priorityCount, setPriorityCount] = useState(0);
  const [simpleArr, setSimpleArr] = useState(null);
  // const [generalArr, setGeneralArr] = useState(null);
  // const [generalArrSave, setGeneralArrSave] = useState(null);
  const [visible, setVisible] = useState("none");
  const [borderVisible, setBorderVisible] = useState("none");
  let curses = useSelector((state) => state.table.adminData.curses);
  const admin = useSelector((state) => state.table.adminData);
  const participant = useSelector((state) => state.table.participantData);
  const priority = useSelector((state) => state.table.priorityData);
  const widgetData = useSelector((state) => state.table.widgetData);
  const widgetCurses = useSelector((state) => state.table.widgetCurses);

  const audioStart = new Audio("/start.wav");
  const audioScroll = new Audio("/scroll.mp3");

  const handleAddCurse = async (curse, id) => {
    let newUncompletedCursesList;
    if (
      participant === null ||
      participant[id]?.uncompletedCursesList === undefined
    ) {
      newUncompletedCursesList = [];
    } else {
      newUncompletedCursesList = [...participant[id]?.uncompletedCursesList];
    }
    newUncompletedCursesList.push(curse);
    updateParticipantData(
      `${id}/uncompletedCursesList`,
      newUncompletedCursesList
    );

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
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Генерируем случайный индекс
      [array[i], array[j]] = [array[j], array[i]]; // Меняем местами
    }
    return array;
  }

  useEffect(() => {
    if (curses !== undefined) {
      const simpleCurses = curses.filter((item) => {
        return item.general === false;
      });
      let newSimpleCurses = [];
      for (let index = 0; index < 4; index++) {
        let result = simpleCurses.map((obj) => {
          return { ...obj, nameMember: admin.listMember[index] };
        });
        newSimpleCurses = newSimpleCurses.concat(result);
      }
      let result;

      if (newSimpleCurses.length > 30) {
        result = newSimpleCurses.slice(0, 30);
        console.log(result.length);
      }
      if (newSimpleCurses.length < 30) {
        const dopArr = newSimpleCurses.slice(0, 30 - newSimpleCurses.length);
        result = newSimpleCurses.concat(dopArr);
      }

      setSimpleArr(result);
      // console.log(newSimpleCurses);

      // const generalCurses = curses.filter((item) => {
      //   return item.general === true;
      // });

      // setGeneralArr(generalCurses);
      // setGeneralArrSave(generalCurses);
      // console.log(generalCurses);
    }
  }, [curses]);

  const clearBorder = (x, y, time) => {
    if (x === 0 && y === 0) {
      setTimeout(() => {
        setBorderVisible("none");
      }, time);
    }
  };

const performClicks = (element, count, delay) => {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
        element.click();
    }, i * delay);
}
}

  useEffect(() => {
    if (widgetData.countScroll !== undefined && simpleArr !== null && (widgetData.countScroll.simpleScroll > 0 || widgetData.countScroll.generalScroll > 0)) {
      let simpleScroll = widgetData.countScroll.simpleScroll
      let generalScroll = widgetData.countScroll.generalScroll
      const interval = 12000

      const button = document.getElementById("myButton");
      const button1 = document.getElementById("myButton1");
      setBorderVisible("flex")
      audioStart.play()

      setTimeout(() => {
        performClicks(button, simpleScroll, interval)
      }, 1500);
      

      setTimeout(() => {
        performClicks(button1, generalScroll, interval);
        setTimeout(() => {
          console.log("очистка");
          updateWidgetData("countScroll", {simpleScroll: 0, generalScroll: 0 , remainder: widgetData.countScroll.remainder, globalRemainder: widgetData.countScroll.globalRemainder})
          setBorderVisible("none")
        }, generalScroll*interval); 
      }, (simpleScroll * interval)+1500);
    }
  }, [widgetData.countScroll]);

  const scrolling = (curse) => {
    if (curse) {
      const fixGeneralCurses = admin.curses.filter((item) => {
        return item.general === true;
      });
      let generalCurses = [...widgetCurses]
      let bigGeneralCurses = generalCurses
      const idCurse = Math.floor(Math.random() * generalCurses.length);
      while (bigGeneralCurses.length < 30) {
        bigGeneralCurses = bigGeneralCurses.concat(bigGeneralCurses);
      }
      bigGeneralCurses = bigGeneralCurses.slice(0, 29);
      shuffle(bigGeneralCurses)
      bigGeneralCurses = [...bigGeneralCurses, generalCurses[idCurse]];
      generalCurses.splice(idCurse,1)
      console.log(generalCurses);
      console.log(fixGeneralCurses);
   
  
      updateWidgetCurses(generalCurses.length === 0 ? fixGeneralCurses:generalCurses);
      document.documentElement.style.setProperty(
        "--translate-value",
        `${(bigGeneralCurses.length - 1) * -270}px`
      );
      setNewCurses(bigGeneralCurses)
      setVisible("flex");
      audioScroll.play();
      setTimeout(async () => {
        setVisible("none");
        const curseName = bigGeneralCurses[bigGeneralCurses.length - 1].name;
        for (let i = 0; i < 4; i++) {
          try {
            await handleAddCurse(curseName, i);
            console.log(`Успешно добавлено ${i}`);
          } catch (e) {
            console.error(`Ошибка при добавлении ${i}:`, e);
          }
        }
      }, 11000);
    } else {
      let randomNumber;
      if (priority.count > 0) {
        console.log(priority.count);
        updatePriorityData({ id: priority.id, count: priority.count - 1 });
        randomNumber = priority.id;
      } else {
        const randomIndex = random(0, base.length - 1);
        randomNumber = base[randomIndex];
        const newBase = base.filter((_, index) => index !== randomIndex);
        setBase(newBase.length === 0 ? [0, 1, 2, 3, 0, 1, 2, 3] : newBase);
      }

      const listCurses = admin.curses.filter((item) => item.general !== true);
      const randomCurses = listCurses[random(0, listCurses.length - 1)];

      let arrCurses = [...shuffle(simpleArr)];
      arrCurses[arrCurses.length - 1] = {
        ...randomCurses,
        nameMember: admin.listMember[randomNumber],
      };

      document.documentElement.style.setProperty(
        "--translate-value",
        `${(simpleArr.length - 1) * -270}px`
      );
      setNewCurses(arrCurses);

      setVisible("flex");
      audioScroll.play();
      setTimeout(() => {
        setVisible("none");
        handleAddCurse(arrCurses[arrCurses.length - 1].name, randomNumber);
      }, 11000);
      setPriorityCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="containerWidget">
      <UpdateAdmin />
      <UpdateParticipant />
      <UpdatePriority />
      <UpdateWidgetData />
      <UpdateWidgetCurses/>
      <button
        id="myButton"
        onClick={() => {
          scrolling(false);
        }}
        style={{ display: "none" }}
      >
        222
      </button>
      <button
        id="myButton1"
        onClick={() => {
          scrolling(true);
        }}
        style={{ display: "none" }}
      >
        222
      </button>
      <div className="widget">
        <div className="widgetborder" style={{ display: borderVisible }}></div>
        {/* <img src="/rog.png" className="icon" alt=""></img> */}
        <div className="spinWrapper" style={{ display: visible }}>
          <div className="listCurses spin">
            {newCurses !== null &&
              newCurses.map((item, index) => (
                <div className="curseWidget" key={index}>
                  <img src={item.image.icon} className="iconCurse" alt=""></img>
                  <span className="nameCurse">{item.name}</span>
                  {item.nameMember !== null && (
                    <span className="nameMember">{item.nameMember}</span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
