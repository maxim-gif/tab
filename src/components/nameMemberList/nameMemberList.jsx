import "./nameMemberList.css";
import { useSelector } from "react-redux";
import { MembersSubscriber } from "../reload/membersName";
import { addNameMembers,addCurse,addListUncompletedCurse } from "../../api";
import { useState} from "react";

export const NameMembersList = ({setMessage}) => {

    let nameMembers = useSelector((state) => state.table.nameMembers);
    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");

    const [indexElement, setIndexElement] = useState();

    const editMembers = async() => {
        let newData
        if (nameMembers === null) {
            newData = []
        } else {
            newData = [...nameMembers]
        }
        newData.push(name)
        const message = await addNameMembers(newData)
        setMessage(message)
        setName('')
    }

    const deleteMember = async(index) => {
        // let newData = [...nameMembers]
        // newData.splice(index,1)
        // console.log(newData);
        // const message = await addNameMembers(newData)
        // setMessage(message)
        addCurse(index,[])
        addListUncompletedCurse(index,[])
    }

    const edit = (index,item) => {
        setIndexElement(index)
        setEditName(item)
    }

    const saveEdit = async(id) => {
        let newData = [...nameMembers]
        newData[id] = editName
        const message = await addNameMembers(newData)
        setMessage(message)
        setIndexElement()
    }

  return (
        <div className="membersList">
            <MembersSubscriber/>
            <span className="titleAdmin">Участники</span>
            {nameMembers !== null &&
            nameMembers?.map((item, index) => (
                <div className="itemList" key={index}>
                    {index === indexElement ? (<input className="itemInput" value={editName} onChange={(e) =>{setEditName(e.target.value)}}></input>):(<span>{item}</span>)}
                    {indexElement !== index && <div className="editItem" onClick={() => {edit(index,item)}}></div>}
                    {indexElement === index && <div className="saveEditItem" onClick={() => {saveEdit(index)}}></div>}
                    {/* <div className="curseItemDelete" onClick={() => {deleteMember(index)}}></div> */}
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
