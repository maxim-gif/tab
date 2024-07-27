import "./main.css";
import { useState, useEffect } from "react";
import { getUserToken, getUserData, addUser, refreshToken } from "../../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Participants } from "../../components/participants/participants";
import { UpdateAdmin } from "../../components/reload/updateAdmin";


export const Main = () => {
  const navigate = useNavigate();

  let admin = useSelector((state) => state.table.adminData);


  const [name, setName] = useState("DowesErwin");

  // const [moderatorsAccess, setModeratorsAccess] = useState(false);
  // const [superModeratorsAccess, setSuperModeratorsAccess] = useState(false);

  const hash = document.location.href;
  const splitHash = hash.split("&")[0];
  let code = splitHash.split("=")[1];

  // useEffect(() => {
  //   if (admin.moderators !== undefined) {
  //     console.log(admin.moderators.includes(name));
  //     setModeratorsAccess(admin.moderators.includes(name));
  //   } else {
  //     setModeratorsAccess(false);
  //   }
  // }, [admin.moderators, name]);

  // useEffect(() => {
  //   if (admin.superModerators !== undefined) {
  //     setSuperModeratorsAccess(admin.superModerators.includes(name));
  //     setModeratorsAccess(admin.superModerators.includes(name));
  //   } else {
  //     setSuperModeratorsAccess(false);
  //     setModeratorsAccess(false);
  //   }
  // }, [admin.superModerators, name]);

  const getUser = async () => {
    const token = window.localStorage.getItem("access_token");
    let userData = await getUserData(token);
    if (userData.status === 401) {
      const newToken = await refreshToken();
      userData = await getUserData(newToken);
    }
    if (userData.data) {
      setName(userData.data[0].display_name);
      window.localStorage.setItem("name", userData.data[0].display_name);
    }
  };

  const auth = async (code) => {
    const token = await getUserToken(code);
    window.localStorage.setItem("access_token", token.access_token);
    window.localStorage.setItem("refresh_token", token.refresh_token);
    const userData = await getUserData(token.access_token);
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
      <UpdateAdmin/>
      <div className="header">
        <div className="logoIcon"></div>
        {/* <div className="logoTitle"></div> */}
        <div className="icons">
          <div className="enter">
            {name.length === 0 && <span>Войти: </span>}
            {name !== "" && (
              <span>
                {name}
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
      <Participants name={name}/>

    </div>
  );
};
