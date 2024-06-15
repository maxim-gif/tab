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
        <div className="containInfo">
                { searchResult !== null && searchResult?.map((item, index) => ((
                    <div className="infoItem" key={index}>
                      <img className="itemImg" src="/bgCurse.png" alt=''></img>
                        <h2>{item.name}</h2>
                        <span>{item.title}</span>
                        <h3>{item.general ? `Общее проклятие. Шанс ${generalChance}%`:`Шанс выпадения ${chance}%`}</h3>
                    </div>)))
                }
            </div>
    </div>
  );
}
