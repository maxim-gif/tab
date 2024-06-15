import './info.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



export const Info = () => {
  const navigate = useNavigate();
    let curses = useSelector((state) => state.table.curses);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
      setSearchResult(curses)
    }, [curses]);

    useEffect(() => {
      const res = curses.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      setSearchResult(res)
    }, [search]);

  return (
    <div className="info">
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
                    </div>)))
                }
            </div>
    </div>
  );
}
