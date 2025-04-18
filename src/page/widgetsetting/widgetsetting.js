import "./widgetsetting.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Enter, updateAdminData,updateWidgetData, updateWidgetCurses} from "../../api";
import { UpdateAdmin } from "../../components/reload/updateAdmin";
import { updatePriorityData } from "../../api";
import { UpdatePriority } from "../../components/reload/updatePriority";
import { UpdateWidgetData } from "../../components/reload/updateWidgetData";
import { UpdateWidgetCurses} from "../../components/reload/updateWidgetCurses";

export const WidgetSetting = () => {
  const admin = useSelector((state) => state.table.adminData);
  const priority = useSelector((state) => state.table.priorityData);
  const widgetData = useSelector((state) => state.table.widgetData);
  const widgetCurses = useSelector((state) => state.table.widgetCurses);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 
  useEffect(() => {
    setTimeout(() => {
      setMessage("")
    },1500)
  }, [message]);



  const start = () => {
    updateAdminData("money/", Number(amount + admin.money));
   
    let simpleScroll = 0
    let remainder = 0
    let generalScroll = 0
    if (amount < 5000) {
      simpleScroll = Math.floor(amount / 500)
      if (widgetData.countScroll.remainder + amount >= 5000) {
        generalScroll = 1
        remainder = (widgetData.countScroll.remainder + amount) - 5000
      } else {
        remainder = (widgetData.countScroll.remainder + amount)
      }
    } else {
      generalScroll = Math.floor(amount / 5000)
      simpleScroll = generalScroll*10
      const newAmount = amount - generalScroll*5000
      const dopSimpleScroll = Math.floor(newAmount / 500)
      if (widgetData.countScroll.remainder + newAmount >= 5000) {
        generalScroll++
        remainder = (widgetData.countScroll.remainder + newAmount) - 5000
      } else {
        remainder = (widgetData.countScroll.remainder + newAmount)
      }
      simpleScroll = simpleScroll + dopSimpleScroll
    }
    updateWidgetData("countScroll", {simpleScroll: simpleScroll, generalScroll: generalScroll , remainder: remainder});
    setAmount("");
  };

 const Auth = async() => {
    const response = await Enter(email,password)
    if (response.uid) {
      console.log(response.uid);
      setMessage("Вход выполнен успешно")
    } else {
      setMessage("Ошибка авторизации")
    }
    setEmail('')
    setPassword("")
  }


  return (
    <div className="widgetSetting">
      <UpdateAdmin />
      <UpdatePriority/>
      <UpdateWidgetData/>
      <UpdateWidgetCurses/>
       
          <input type='text' className="authInput" placeholder='Введити email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
          <input type='text' className="authInput" placeholder='Введите пароль' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
          <button className="authButton" onClick={() => {Auth()}}>Войти</button>
        
        {message !== "" && <span className="message">{message}</span>}
        {message === "" &&<span className="message"></span>}

      <span>{admin.money}</span>
      <input
        className="widthSettingWidget"
        type="number"
        placeholder="Введите сумму"
        value={amount}
        onChange={(event) => {
          setAmount(Number(event.target.value));
        }}
      ></input>
      <button
      className="widthSettingWidget"
        onClick={() => {
          start();
        }}
      >
        Внести
      </button>
      <button
      className="widthSettingWidget"
        onClick={() => {
          updateAdminData("money/", 0);
          updateWidgetData("countScroll", {simpleScroll: 0, generalScroll: 0 , remainder: 0});
        }}
      >
        Очистить
      </button>
      <button
      className="widthSettingWidget"
        onClick={() => {
          const generalCurses = admin.curses.filter((item) => {
            return item.general === true;
          });
          updateWidgetCurses(generalCurses);
        }}
      >
        Обновить общие проклятия
      </button>
      <div>
        {widgetCurses !== null && widgetCurses.map((item, index) => (
          <span className="widgetSpan" key={index}>{item.name}</span>
        ))}
      </div>

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
