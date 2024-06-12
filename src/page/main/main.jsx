import "./main.css";
import { useState, useEffect } from "react";
import {
  getUserToken,
  getUserData,
  addUser,
} from "../../api";
import { DataSubscriber } from "../../components/reload/reload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Member } from "../../components/member/member";
import { MembersSubscriber } from "../../components/reload/membersName";
import { ModeratorSubscriber } from "../../components/reload/moderator";


export const Main = () => {

  const navigate = useNavigate();

  let dataModerators = useSelector((state) => state.table.moderators);
  let nameMembers = useSelector((state) => state.table.nameMembers);


  const [name, setName] = useState("");
  // const [member, setMember] = useState(1);
  const [moderatorsAccess, setModeratorsAccess] = useState(false);


  const hash = document.location.href;
  const splitHash = hash.split("&")[0];
  let code = splitHash.split("=")[1];

  useEffect(() => {
    console.log(dataModerators);
    if (dataModerators !== null) {
      setModeratorsAccess(dataModerators.includes(name));
    } else {
      setModeratorsAccess(false);
    }
  }, [dataModerators,name]);


  const getUser = async () => {
    const token = window.localStorage.getItem("access_token");
    const userData = await getUserData(token);
    if (userData) {
      setName(userData[0].display_name);
    }
  };

  const auth = async (code) => {
    const token = await getUserToken(code);
    window.localStorage.setItem("access_token", token.access_token);
    window.localStorage.setItem("refresh_token", token.refresh_token);
    const userData = await getUserData(token.access_token);
    addUser(userData[0].id, userData[0].display_name);
    setName(userData[0].display_name);
    navigate("/");
  };

  useEffect(() => {
    if (code !== undefined) {
      auth(code);
      code = undefined;
    } else {
      if (window.localStorage.getItem("access_token")) {
        getUser();
      }
    }
  }, []);

 
  

  // const switchMember = (index) => {
  //   console.log(index);
  //   setMember(index)
  // }

  return (
    <div className="containerApp">
      <div className="header">
        <div className="logoIcon"></div>
        <div className="logoTitle"></div>
        <div className="enter">
          {name.length === 0 && <span>Войти: </span>}
          <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=9tme6blew754pa56v75lf5mgqg0iro&redirect_uri=https://tab-jet.vercel.app&scope=user:read:email">
            <div className="twitch"></div>
          </a>
          {name !== "" && (
            <span>
              {name} {moderatorsAccess}
            </span>
          )}
        </div>
      </div>
      {/* <div className="switchMember">
        {nameMembers.map((item, index) => (
          <button key={index} onClick={() => {switchMember(index)}}>{item}</button>
        ))}
      </div> */}
      <div className="memberList">
        <Member id={0} moderatorsAccess={moderatorsAccess} name={nameMembers[0]}/>
        <Member id={1} moderatorsAccess={moderatorsAccess} name={nameMembers[1]}/>
        <Member id={2} moderatorsAccess={moderatorsAccess} name={nameMembers[2]}/>
        <Member id={3} moderatorsAccess={moderatorsAccess} name={nameMembers[3]}/>
      </div>
      <DataSubscriber />
      <MembersSubscriber/>
      <ModeratorSubscriber/>
    </div>
  );
};
