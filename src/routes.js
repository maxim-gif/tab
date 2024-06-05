import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from "./page/main/main";
import { Admin } from "./page/admin/admin";
import { useEffect } from "react";
import { getDataMember } from "./api";
import { useDispatch } from 'react-redux';
import { setMember1, setMember2,setMember3,setMember4} from './store/slice/slice';

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

  };

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
