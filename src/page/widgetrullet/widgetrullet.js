import "./widgetrullet.css";
import { useEffect, useState } from "react";
import { updateParticipantData, updatePriorityData } from "../../api";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../../components/reload/updateAdmin";
import { UpdatePriority } from "../../components/reload/updatePriority";
import { UpdateParticipant } from "../../components/reload/updateParticipant";
import random from "lodash/random";

export const Widgetrullet = () => {
  const [base, setBase] = useState([0, 1, 2, 3, 0, 1, 2, 3]);
  const [newCurses, setNewCurses] = useState(null);
  const [priorityCount, setPriorityCount] = useState(0);
  const [priorityId, setPriorityId] = useState(0);
  const [oddMoney, setOddMoney] = useState(0);
  const [oddMoneyBalance, setOddMoneyBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [simpleArr, setSimpleArr] = useState(null);
  const [generalArr, setGeneralArr] = useState(null);
  const [generalArrSave, setGeneralArrSave] = useState(null);
  const [visible, setVisible] = useState("none");
  let curses = useSelector((state) => state.table.adminData.curses);
  const admin = useSelector((state) => state.table.adminData);
  const participant = useSelector((state) => state.table.participantData);
  const priority = useSelector((state) => state.table.priorityData);

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

      setSimpleArr(newSimpleCurses);
      // console.log(newSimpleCurses);

      const generalCurses = curses.filter((item) => {
        return item.general === true;
      });

      setGeneralArr(generalCurses);
      setGeneralArrSave(generalCurses);
      // console.log(generalCurses);
    }
  }, [curses]);


  useEffect(() => {
    if (admin.money !== undefined) {
      // console.log(admin.money);
      // console.log(admin.money.balance);
      let amount = admin.money - balance;
      if (simpleArr !== null) {
        console.log(amount);
        setBalance(admin.money);
        let sum = amount + oddMoney;
        let simpleScroll = Math.floor(sum / 500);
        const difference = sum - simpleScroll * 500;
        setOddMoney(difference);

        let sumSize = amount + oddMoneyBalance;
        let generalScroll = Math.floor(sumSize / 5000);
        const differenceSize = sumSize - generalScroll * 5000;
        setOddMoneyBalance(differenceSize);

        const button = document.getElementById("myButton");
        if (simpleScroll > 0) {
          button.click();
        }
        simpleScroll--;
        const timerId = setInterval(() => {
          if (simpleScroll <= 0) {
            clearInterval(timerId);
            const button1 = document.getElementById("myButton1");
            if (generalScroll > 0) {
              button1.click();
              generalScroll--;
            }
          } else {
            button.click();
            simpleScroll--;
          }
        }, 11500);
      }
    }
  }, [admin.money]);

 
  
  useEffect(() => {
    // console.log(priorityCount);
  }, [priorityCount]);

  const scrolling = (curse) => {
    if (curse) {
      // console.log(generalArr);
      let newArr = [];
      const idCurse = Math.floor(Math.random() * generalArr.length);
      // console.log(idCurse);
      // console.log(generalArr[idCurse]);
      while (newArr.length <= 16) {
        newArr = newArr.concat(generalArr);
      }
      shuffle(newArr);
      newArr = [...newArr, generalArr[idCurse]];
      // console.log(newArr);
      const newArray = generalArr.filter((_, index) => index !== idCurse);
      //  console.log(newArray);
      setGeneralArr(newArray.length === 0 ? generalArrSave : newArray);
      document.documentElement.style.setProperty(
        "--translate-value",
        `${(newArr.length - 1) * -250}px`
      );
      setNewCurses(newArr);
      setVisible("flex");
      setTimeout(() => {
        setVisible("none");
        handleAddCurse(newArr[newArr.length - 1].name, 0);
        handleAddCurse(newArr[newArr.length - 1].name, 1);
        handleAddCurse(newArr[newArr.length - 1].name, 2);
        handleAddCurse(newArr[newArr.length - 1].name, 3);
      }, 11000);
    } else {
      let randomNumber
      if (priority.count > 0) {
        console.log(priority.count);
        updatePriorityData({id:priority.id,count:priority.count-1})
        randomNumber = priority.id
      } else {
        const randomIndex = random(0, base.length - 1);
        randomNumber = base[randomIndex];
        const newBase = base.filter((_, index) => index !== randomIndex);
        console.log(newBase);
        setBase(newBase.length === 0 ? [0, 1, 2, 3, 0, 1, 2, 3] : newBase);
      }

      const listCurses = admin.curses.filter((item) => item.general !== true);
      const randomCurses = listCurses[random(0, listCurses.length - 1)];

      let arrCurses = [...shuffle(simpleArr)];
      arrCurses[arrCurses.length - 1] = {
        ...randomCurses,
        nameMember: admin.listMember[randomNumber],
      };
      // console.log(arrCurses);
      document.documentElement.style.setProperty(
        "--translate-value",
        `${(simpleArr.length - 1) * -250}px`
      );
      setNewCurses(arrCurses);

      setVisible("flex");
      setTimeout(() => {
        setVisible("none");
        handleAddCurse(arrCurses[arrCurses.length - 1].name, randomNumber);
      }, 11000);
      setPriorityCount(prevCount => prevCount - 1)
    }
  };

 

  return (
    <div className="containerWidget">
      <UpdateAdmin />
      <UpdateParticipant />
     <UpdatePriority/>
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
      <div className="widget" style={{ display: visible }}>
        {/* <img src="/rog.png" className="icon" alt=""></img> */}
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
  );
};
