import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from "./page/main/main";
import { Admin } from "./page/admin/admin";
import { useEffect } from "react";
import { getDataMember,getCurses,getNameMembers } from "./api";
import { useDispatch } from 'react-redux';
import { setMember1, setMember2,setMember3,setMember4,setCurses,setNameMembers} from './store/slice/slice';

export const AppRoutes = () => {

  const dispatch = useDispatch();

  const handleGetData = async() => {
    const data1 = await getDataMember(0);
    dispatch(setMember1(data1));
    const data2 = await getDataMember(1);
    dispatch(setMember2(data2));
    const data3 = await getDataMember(2);
    dispatch(setMember3(data3));
    const data4 = await getDataMember(3);
    dispatch(setMember4(data4));
    const curses = await getCurses();
    dispatch(setCurses(curses));
    const names = await getNameMembers();
    dispatch(setNameMembers(names));

  };
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', function() {
  //     navigator.serviceWorker.register('../sw.js').then(function(registration) {
  //       // Успешная регистрация
  //       console.log('ServiceWorker registration successful');
  //     }, function(err) {
  //       // При регистрации произошла ошибка
  //       console.log('ServiceWorker registration failed: ', err);
  //     });
  //   });
  // }
  
 
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.') }})

  Notification.requestPermission(function(status) {
    console.log('Статус разрешения уведомления:', status);
  });
  
  useEffect(() => {
    handleGetData()
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};
