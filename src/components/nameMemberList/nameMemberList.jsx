import "./nameMemberList.css";
import { useSelector } from "react-redux";
import { MembersSubscriber } from "../reload/membersName";
import { addNameMembers } from "../../api";
import { useState} from "react";

export const NameMembersList = () => {

    let nameMembers = useSelector((state) => state.table.nameMembers);
    const [name, setName] = useState("");

    const editMembers = () => {
        let newData = [...nameMembers]
        newData.push(name)
        addNameMembers(newData)
    }

    const deleteMember = (index) => {
        let newData = [...nameMembers]
        newData.splice(index,1)
        addNameMembers(newData)
    }

  return (
    <div className="membersList">
        <MembersSubscriber/>
        <span className="membersListTitle">Участники</span>
        {nameMembers !== null &&
          nameMembers?.map((item, index) => (
            <div className="nameMember" key={index}>
              <span>{item}</span>
              <div className="curseItemDelete" onClick={() => {deleteMember(index)}}></div>
            </div>
          ))}
          <input className="inputAdmin" type="text" onChange={(e) => {setName(e.target.value)}}></input>
          <button className="buttonAdmin" onClick={() => {editMembers()}}>Добавить участника</button>
    </div>
  );
};
