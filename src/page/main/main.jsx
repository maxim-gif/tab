import "./main.css";
import { useState, useEffect } from "react";
import { getUserToken, getUserData, addUser,refreshToken } from "../../api";
import { DataSubscriber } from "../../components/reload/reload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Member1 } from "../../components/members/member1";
import { Member2 } from "../../components/members/member2";
import { Member3 } from "../../components/members/member3";
import { Member4 } from "../../components/members/member4";
import { MembersSubscriber } from "../../components/reload/membersName";
import { ModeratorSubscriber } from "../../components/reload/moderator";
import { SuperModeratorSubscriber } from "../../components/reload/superModerators";

export const Main = () => {
  const navigate = useNavigate();

  let dataModerators = useSelector((state) => state.table.moderators);
  let dataSuperModerators = useSelector((state) => state.table.superModerators);
  let nameMembers = useSelector((state) => state.table.nameMembers);

  const [name, setName] = useState("");
  // const [member, setMember] = useState(1);
  const [moderatorsAccess, setModeratorsAccess] = useState(false);
  const [superModeratorsAccess, setSuperModeratorsAccess] = useState(false);

  const hash = document.location.href;
  const splitHash = hash.split("&")[0];
  let code = splitHash.split("=")[1];

  useEffect(() => {
    if (dataModerators !== null) {
      setModeratorsAccess(dataModerators.includes(name));
    } else {
      setModeratorsAccess(false);
    }
  }, [dataModerators, name]);


  useEffect(() => {
    if (dataSuperModerators !== null) {
      setSuperModeratorsAccess(dataSuperModerators.includes(name));
      setModeratorsAccess(dataSuperModerators.includes(name));
    } else {
      setSuperModeratorsAccess(false);
      setModeratorsAccess(false);
    }
  }, [dataSuperModerators, name]);

  const getUser = async () => {
    const token = window.localStorage.getItem("access_token");
    let userData = await getUserData(token);
    if (userData.status === 401) {
      const newToken = await refreshToken()
      userData = await getUserData(newToken)
    }
    if (userData.data) {
      setName(userData.data[0].display_name);
      window.localStorage.setItem("name", userData.data[0].display_name);
    }
  };

  const auth = async (code) => {
    console.log("auth");
    const token = await getUserToken(code);
    window.localStorage.setItem("access_token", token.access_token);
    window.localStorage.setItem("refresh_token", token.refresh_token);
    const userData = await getUserData(token.access_token);
    console.log(userData);
    console.log(userData.data[0].id);
    console.log(userData.data[0].display_name);
    addUser(userData.data[0].id, userData.data[0].display_name);
    setName(userData.data[0].display_name);
    navigate("/");
  };

  useEffect(() => {
    if (code !== undefined) {
      auth(code);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      code = undefined;
    } else {
      if (window.localStorage.getItem("access_token")) {
        getUser();
      }
    }
  }, []);

  return (
    <div className="containerApp">
      <div className="header">
        <div className="logoIcon"></div>
        {/* <div className="logoTitle"></div> */}
        <div className="icons">
          <div className="enter">
            {name.length === 0 && <span>Войти: </span>}
            {name !== "" && (
              <span>
                {name} {moderatorsAccess}
              </span>
            )}
            <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=9tme6blew754pa56v75lf5mgqg0iro&redirect_uri=https://tab-jet.vercel.app&scope=user:read:email">
              <div className="twitch"></div>
            </a>
          </div>
          <div className="moreBox">
            <span>Подробнее:</span>
            <div
              className="more"
              onClick={() => {
                navigate("/info");
              }}
            ></div>
          </div>
          <div className="historyBox">
            <span>История МИ:</span>
            <div
              className="historyPng"
              onClick={() => {
                navigate("/history");
              }}
            ></div>
          </div>
        </div>
      </div>
      {!nameMembers[3] ? (
        <span className="loader"></span>
      ) : (
        <div className="memberList">
          <Member1 moderatorsAccess={moderatorsAccess} superModeratorsAccess={superModeratorsAccess} name={nameMembers[0]} />
          <Member2 moderatorsAccess={moderatorsAccess} superModeratorsAccess={superModeratorsAccess} name={nameMembers[1]} />
          <Member3 moderatorsAccess={moderatorsAccess} superModeratorsAccess={superModeratorsAccess} name={nameMembers[2]} />
          <Member4 moderatorsAccess={moderatorsAccess} superModeratorsAccess={superModeratorsAccess} name={nameMembers[3]} />
          
        </div>
      )}

      <DataSubscriber />
      <MembersSubscriber />
      <ModeratorSubscriber />
      <SuperModeratorSubscriber/>
    </div>
  );
};
