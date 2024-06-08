import "./nameMemberList.css";
import { useSelector } from "react-redux";
import { MembersSubscriber } from "../reload/membersName";
import { addNameMembers } from "../../api";
import { useState} from "react";

export const NameMembersList = () => {

    let nameMembers = useSelector((state) => state.table.nameMembers);
    const [name, setName] = useState("");

    const editMembers = () => {
        let newData
        if (nameMembers === null) {
            newData = []
        } else {
            newData = [...nameMembers]
        }
        newData.push(name)
        addNameMembers(newData)
        setName('')
    }

    const deleteMember = (index) => {
        let newData = [...nameMembers]
        newData.splice(index,1)
        console.log(newData);
        addNameMembers(newData)
    }


  return (
        <div className="membersList">
            <MembersSubscriber/>
            <span className="titleAdmin">Участники</span>
            {nameMembers !== null &&
            nameMembers?.map((item, index) => (
                <div className="itemList" key={index}>
                    <span>{item}</span>
                    <div className="curseItemDelete" onClick={() => {deleteMember(index)}}></div>
                </div>
            ))}
            {nameMembers === null || nameMembers.length < 4 ? (
                <div>
                    <input className="inputAdmin" placeholder="Введите имя участника" value={name} type="text" onChange={(e) => {setName(e.target.value)}}></input>
                    <button className="buttonAdmin" onClick={() => {editMembers()}}>Добавить участника</button>
                </div>
            ) : null}
        </div>
  );
};
