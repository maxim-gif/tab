import "./history.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const History = () => {

    const navigate = useNavigate();
    let dataHis = useSelector((state) => state.table.history);
    const [year, setYear] = useState(0);
    const [releaseNumber, setReleaseNumber] = useState(0);


    const switchNumber = (e,index) => {
        e.stopPropagation()
        setReleaseNumber(index)
    }
console.log(dataHis);
  return (
    <div className="history">
        <div className="side">
            <div className="historyLogo" onClick={() => {navigate("/")}}></div>
            {dataHis && <div className="listSeason">
            { dataHis.map((item, indexYear) => ((
                <div key={indexYear} onClick={() => {
                    setYear(indexYear)
                    setReleaseNumber(0)
                    }}>
                    <div className="year">{item.year}</div>
                    {year === indexYear && item.release.map((item, index) => (
                        <div className="releaseName" key={index} onClick={(e) => {switchNumber(e,index)}}><span>{item.name}</span></div>
                    ))}
                </div>
                    )))
                }
            </div>}
        </div>
        { dataHis.length >  0 ? (<div className="historyMain">
            <div className="listCursesMember">
                <div className="historyMember">{dataHis[year].release[releaseNumber].data[0].name}</div>
                { dataHis[year].release[releaseNumber].data[0].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item.name} x {item.completedCounter}</div>
                    )))
                }
            </div>
            <div className="listCursesMember">
                <div className="historyMember">{dataHis[year].release[releaseNumber].data[1].name}</div>
                { dataHis[year].release[releaseNumber].data[1].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item.name} x {item.completedCounter}</div>
                    )))
                }
            </div>
            <div>
                <iframe
                width="700"
                height="400"
                src={'https://www.youtube.com/embed/' + dataHis[year].release[releaseNumber].url.split('be/')[1]}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                ></iframe>
            </div>
            <div className="listCursesMember">
                <div className="historyMember">{dataHis[year].release[releaseNumber].data[2].name}</div>
                { dataHis[year].release[releaseNumber].data[2].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item.name} x {item.completedCounter}</div>
                    )))
                }
            </div>
            <div className="listCursesMember">
                <div className="historyMember">{dataHis[year].release[releaseNumber].data[3].name}</div>
                { dataHis[year].release[releaseNumber].data[3].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item.name} x {item.completedCounter}</div>
                    )))
                }
            </div>
        </div>):(<span class="loader"></span>)}
    </div>
  );
};
