import "./moderators.css";
import { useSelector } from "react-redux";
import { ModeratorSubscriber } from "../reload/moderator";
import { sendModerator } from "../../api";
import { useState} from "react";


export const ModeratorList = ({setMessage}) => {
    let dataModerators = useSelector((state) => state.table.moderators)
    const [name, setName] = useState("");

    const deleteModerator = async(index) => {
        let newData = [...dataModerators]
        newData.splice(index,1)
        console.log(newData);
        const message = await sendModerator(newData)
        setMessage(message)
    }

    const addModerator = async() => {
        let newData
        if (dataModerators === null) {
            newData = []
        } else {
            newData = [...dataModerators]
        }
       newData.push(name)
       const message = await sendModerator(newData)
        setMessage(message)
       setName('')
    }
  return (
    <div className="moderators">
        <ModeratorSubscriber/>
        <div className="titleAdmin">Модераторы</div>
        { dataModerators !== null && dataModerators?.map((item, index) => ((
            <div className="itemList" key={index}>
                <span>{item}</span>
                <div className="deleteModerator" onClick={() => deleteModerator(index)}></div>
            </div>)))
        }
        <input className="inputAdmin" type='text' placeholder='Введите твич никнейм' value={name} onChange={(e) => {setName(e.target.value)}}></input>
        <button className="buttonAdmin" onClick={() => addModerator()}>Добавить модератора</button>  
    </div>
  );
};
