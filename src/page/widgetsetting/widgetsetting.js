import "./widgetsetting.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateAdminData } from "../../api";
import { UpdateAdmin } from "../../components/reload/updateAdmin";

export const WidgetSetting = () => {
  const admin = useSelector((state) => state.table.adminData);
  const [amount, setAmount] = useState("");
  const [idMember, setIdMember] = useState(0);
  const [count, setCount] = useState(0);

  const start = () => {
    updateAdminData("money/", Number(amount + admin.money));
    setAmount("");
  };

    const handle = () => {
      updateAdminData("priority/", {idMember:idMember,count:count})
      setIdMember(0)
      setCount(0)
    }

  return (
    <div className="widgetSetting">
      <UpdateAdmin />
      <span>{admin.money}</span>
      <input
        type="number"
        placeholder="Введите сумму"
        value={amount}
        onChange={(event) => {
          setAmount(Number(event.target.value));
        }}
      ></input>
      <button
        onClick={() => {
          start();
        }}
      >
        Внести
      </button>
      <button
        onClick={() => {
          updateAdminData("money/", 0);
        }}
      >
        Очистить
      </button>

  { admin.length !== 0  && <fieldset>
        <legend>Выберите участника:</legend>

        <div>
          <input type="radio" id="scales" value={admin.listMember[0]} name="member" checked={idMember===0} onChange={() =>{setIdMember(0)}}/>
          <label htmlFor="scales">{admin.listMember[0]}</label>
        </div>

        <div>
          <input type="radio" id="horns" value={admin.listMember[1]} name="member" checked={idMember===1} onChange={() =>{setIdMember(1)}}/>
          <label htmlFor="horns">{admin.listMember[1]}</label>
        </div>

        <div>
          <input type="radio" id="horns" value={admin.listMember[2]} name="member" checked={idMember===2} onChange={() =>{setIdMember(2)}}/>
          <label htmlFor="horns">{admin.listMember[2]}</label>
        </div>

        <div>
          <input type="radio" id="horns" value={admin.listMember[3]} name="member" checked={idMember===3} onChange={() =>{setIdMember(3)}}/>
          <label htmlFor="horns">{admin.listMember[3]}</label>
        </div>

      </fieldset>}

      <div className="counter">
        <span>Количество проклятий:</span>
        <button onClick={() => {setCount(prevCount => prevCount - 1)}} disabled={count === 0}>-</button>
        <span>{count}</span>
        <button onClick={() => {setCount(prevCount => prevCount + 1)}}>+</button>
      </div>
      <button onClick={() => {handle()}}>Применить</button>
    </div>
  );
};
