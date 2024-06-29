/* eslint-disable react-hooks/exhaustive-deps */
import './info.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CursesSubscriber } from '../../components/reload/curses';



export const Info = () => {
  const navigate = useNavigate();
    let curses = useSelector((state) => state.table.curses);
    const [search, setSearch] = useState("");
    const [chance, setChance] = useState();
    const [generalChance, setGeneralChance] = useState();
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
      setSearchResult(curses)
      const chanceCurse = 100 / curses.filter(item => !item.general).length
      const chanceGeneralCurse = 100 / curses.filter(item => item.general).length
      setChance(chanceCurse.toFixed(2))
      setGeneralChance(chanceGeneralCurse.toFixed(2))
    }, [curses]);

    useEffect(() => {
      const res = curses.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      setSearchResult(res)
    }, [search]);

  return (
    <div className="info">
      <CursesSubscriber/>
      <div className="headerInfo">
        <div className="logoInfo"></div>
        <input className="searchInfo" type='text' value={search} onChange={(e) => {setSearch(e.target.value)}}></input>
        <div className="closePage" onClick={() => {navigate("/")}}></div>
      </div>
        {curses.length > 0 ?(<div className="containInfo">
                { searchResult !== null && searchResult?.map((item, index) => ((
                    <div className="infoItem" key={index}>
                      {item?.image?.icon && <div className="headerItem">
                        <img className="iconItem" alt='' src={item.image.icon}></img>
                        <div className="nameItem">{item.name}</div>
                      </div>}
                      {!item?.image?.icon && <div className="nameItem" style={{width:"100%", borderRadius:"5px"}}>{item.name}</div>}
                      <div className="descriptionItem">
                        <span>{item.title}</span>
                        {item?.image?.img && <img src={item.image.img} alt=''></img>}
                      </div>
                      <div className="chanceItem">{item.general ? `Общее проклятие. Шанс ${generalChance}%`:`Шанс выпадения ${chance}%`}</div>
                    </div>)))
                }
        </div>):(<span class="loader"></span>)}
    </div>
  );
}
