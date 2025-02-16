import "./widgetsetting.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateAdminData } from "../../api";
import { UpdateAdmin } from "../../components/reload/updateAdmin";
import { updatePriorityData } from "../../api";
import { UpdatePriority } from "../../components/reload/updatePriority";

export const WidgetSetting = () => {
  const admin = useSelector((state) => state.table.adminData);
  const priority = useSelector((state) => state.table.priorityData);
  const [amount, setAmount] = useState("");
 

  const start = () => {
    updateAdminData("money/", Number(amount + admin.money));
    setAmount("");
  };


  return (
    <div className="widgetSetting">
      <UpdateAdmin />
      <UpdatePriority/>
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
          <input type="radio" id="scales" value={admin.listMember[0]} name="member" checked={priority.id===0} onChange={() =>{updatePriorityData({id:0,count:priority.count})}}/>
          <label htmlFor="scales">{admin.listMember[0]}</label>
        </div>

        <div>
          <input type="radio" id="horns" value={admin.listMember[1]} name="member" checked={priority.id===1} onChange={() =>{updatePriorityData({id:1,count:priority.count})}}/>
          <label htmlFor="horns">{admin.listMember[1]}</label>
        </div>

        <div>
          <input type="radio" id="horns" value={admin.listMember[2]} name="member" checked={priority.id===2} onChange={() =>{updatePriorityData({id:2,count:priority.count})}}/>
          <label htmlFor="horns">{admin.listMember[2]}</label>
        </div>

        <div>
          <input type="radio" id="horns" value={admin.listMember[3]} name="member" checked={priority.id===3} onChange={() =>{updatePriorityData({id:3,count:priority.count})}}/>
          <label htmlFor="horns">{admin.listMember[3]}</label>
        </div>

      </fieldset>}

      <div className="counter">
        <span>Количество проклятий:</span>
        <button onClick={() => {updatePriorityData({id:priority.id,count:priority.count-1})}} disabled={priority.count === 0}>-</button>
        <span>{priority.count}</span>
        <button onClick={() => {updatePriorityData({id:priority.id,count:priority.count+1})}}>+</button>
      </div>
    </div>
  );
};
