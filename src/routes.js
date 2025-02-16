import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from "./page/main/main";
import { Admin } from "./page/admin/admin";
import { Info } from "./page/info/info";
import { History } from "./page/history/history";
import { useEffect } from "react";
import { getAdminData, getParticipantData,getDataHistory, } from "./api";
import { useDispatch } from 'react-redux';
import { setAdminData, setParticipantData, setHistory,} from './store/slice/slice';
import { Widgetrullet } from "./page/widgetrullet/widgetrullet";
import { WidgetSetting } from "./page/widgetsetting/widgetsetting";

export const AppRoutes = () => {

  const dispatch = useDispatch();

  const handleGetData = async() => {
    const adminData = await getAdminData();
    dispatch(setAdminData(adminData));
    const userData = await getParticipantData();
    dispatch(setParticipantData(userData));
    const history = await getDataHistory();
    dispatch(setHistory(history));
    localStorage.setItem('members', JSON.stringify(adminData.listMember));
  };

  // Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //        }})

  // Notification.requestPermission(function(status) {
  //   console.log('Статус разрешения уведомления:', status);
  // });
  
  useEffect(() => {
    handleGetData()
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/info" element={<Info />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/widgetrullet" element={<Widgetrullet />}/>
        <Route path="/widgetSetting" element={<WidgetSetting />}/>
      </Routes>
    </BrowserRouter>
  );
};
