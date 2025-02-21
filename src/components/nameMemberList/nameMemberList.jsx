import "./nameMemberList.css";
import { useSelector } from "react-redux";
import { UpdateAdmin } from "../reload/updateAdmin";
import { UpdateParticipant } from "../reload/updateParticipant.js";
import { updateAdminData , updateParticipantData} from "../../api";
import { useState } from "react";

export const NameMembersList = ({ setMessage, auth }) => {
  let admin = useSelector((state) => state.table.adminData);
  const participant = useSelector((state) => state.table.participantData);
  
  const [editName, setEditName] = useState("");

  const [indexElement, setIndexElement] = useState();



  const deleteMember = async (index) => {
    console.log(auth.currentUser);
    console.log("delete");
    console.log(participant);
    updateParticipantData(index,[])
  };

  const edit = (index, item) => {
    setIndexElement(index);
    setEditName(item);
  };

  const saveEdit = async (id) => {
    let newData = [...admin.listMember];
    editName === "" ? newData[id] =`Участник №${id + 1}` : newData[id] = editName;
    const message = await updateAdminData("listMember/", newData);
    setMessage(message);
    setIndexElement();
  };

  return (
    <div className="membersList">
      <UpdateAdmin />
      <UpdateParticipant />
      <span className="titleAdmin">Участники</span>
      {admin.listMember !== null &&
        admin.listMember?.map((item, index) => (
          <div className="itemList" key={index}>
            {index === indexElement ? (
              <input
                className="itemInput"
                value={editName}
                onChange={(e) => {
                  setEditName(e.target.value);
                }}
              ></input>
            ) : (
              <span>{item}</span>
            )}
            {indexElement !== index && (
              <div
                className="editItem"
                onClick={() => {
                  edit(index, item);
                }}
              ></div>
            )}
            {indexElement === index && (
              <div
                className="saveEditItem"
                onClick={() => {
                  saveEdit(index);
                }}
              ></div>
            )}
            {participant !== null && auth.currentUser !== null && participant[index] && <div
              className="curseItemDelete"
              onClick={() => {
                deleteMember(index);
              }}
            ></div>}
          </div>
        ))}
    </div>
  );
};
