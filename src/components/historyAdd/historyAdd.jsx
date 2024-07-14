import "./historyAdd.css";
import { useSelector } from "react-redux";
import { addDataHistory } from "../../api.js";
import { useState, useEffect } from "react";
import { HistorySubscriber } from "../reload/history.js";

export const HistoryAdd = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  let nameMembers = useSelector((state) => state.table.nameMembers);
  let dataHis = useSelector((state) => state.table.history);
  const dataMember1 = useSelector((state) => state.table.member1);
  const dataMember2 = useSelector((state) => state.table.member2);
  const dataMember3 = useSelector((state) => state.table.member3);
  const dataMember4 = useSelector((state) => state.table.member4);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    console.log("reload");
  }, [dataHis]);

  const handleAddHistory = () => {
    let newData = dataHis?.map((obj) => ({ ...obj })) || [];

    const lastYear = newData[newData.length - 1];

  

    let member1 = [];
    dataMember1.map((item) => member1.push(item.name));
    let member2 = [];
    dataMember2.map((item) => member2.push(item.name));
    let member3 = [];
    dataMember3.map((item) => member3.push(item.name));
    let member4 = [];
    dataMember4.map((item) => member4.push(item.name));

    if (Number(lastYear?.year) === currentYear) {
      lastYear.release = [
        ...lastYear.release,
        {
          name: name,
          url: url,
          data: [
            { name: nameMembers[0], curses: member1 },
            { name: nameMembers[1], curses: member2 },
            { name: nameMembers[2], curses: member3 },
            { name: nameMembers[3], curses: member4 },
          ],
        },
      ];

    } else {
      newData.push({
        year: currentYear,
        release: [
          {
            name: name,
            url: url,
            data: [
              { name: nameMembers[0], curses: member1 },
              { name: nameMembers[1], curses: member2 },
              { name: nameMembers[2], curses: member3 },
              { name: nameMembers[3], curses: member4 },
            ],
          },
        ],
      });
    }
    addDataHistory(newData);
    setUrl("");
    setName("");
  };

  return (
    <div className="historyAdd">
      <HistorySubscriber />
      <input
        className="inputAdmin"
        value={name}
        type="text"
        placeholder="Введите название выпуска"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        className="inputAdmin"
        value={url}
        type="text"
        placeholder="Вставте ссылку"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      ></input>
      <button
        className="buttonAdmin"
        disabled={name === "" || url === ""}
        onClick={() => {
          handleAddHistory();
        }}
      >
        Сформировать историю выпуска
      </button>
    </div>
  );
};
