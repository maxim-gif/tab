import "./main.css";
import { useState, useEffect } from "react";
import {
  getToken,
  getUserData,
  addUser,
  GetModerators,
} from "../../api";
import { DataSubscriber } from "../../components/reload/reload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Member } from "../../components/member/member";

export const Main = () => {

  const navigate = useNavigate();

  let dataModerators = useSelector((state) => state.table.moderators);

  const [name, setName] = useState("");
  const [moderatorsAccess, setModeratorsAccess] = useState(false);

  const hash = document.location.href;
  const splitHash = hash.split("&")[0];
  let code = splitHash.split("=")[1];

  const handleGetModerators = async () => {
    const data = await GetModerators();
    if (data !== null) {
      setModeratorsAccess(data.includes(name));
    } else {
      setModeratorsAccess(false);
    }
  };

  const getUser = async () => {
    const token = window.localStorage.getItem("access_token");
    console.log(token);
    const userData = await getUserData(token);
    if (userData) {
      setName(userData[0].display_name);
    }
  };

  const auth = async (code) => {
    const token = await getToken(code);
    console.log(token);
    window.localStorage.setItem("access_token", token.access_token);
    window.localStorage.setItem("refresh_token", token.refresh_token);
    const userData = await getUserData(token.access_token);

    console.log(userData === undefined ? null : userData[0]);
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
    handleGetModerators();
  }, []);

  useEffect(() => {
    handleGetModerators();
  }, [dataModerators,name]);

  return (
    <div className="containerApp">
      <div className="logo">
        <div className="enter">
          {name.length === 0 && <span>Войти с помощью </span>}
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
      <div className="memberList">
        <Member id={0} moderatorsAccess={moderatorsAccess} />
        <Member id={1} moderatorsAccess={moderatorsAccess} />
        <Member id={2} moderatorsAccess={moderatorsAccess} />
        <Member id={3} moderatorsAccess={moderatorsAccess} />
      </div>
      <DataSubscriber />
    </div>
  );
};
