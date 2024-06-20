import "./history.css";
import { getDataHistory, addDataHistory } from "../../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const History = () => {

    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState([]);
    const [focusData, setFocusData] = useState("s2e35");

    const getData = async() => {
        const data = await getDataHistory() 
        setHistoryData(data)
        console.log(data);
    }

    useEffect(() => {
        getData()
      }, [])

  return (
    <div className="history">
        <div className="side">
            <div className="historyLogo" onClick={() => {navigate("/")}}></div>
            <div className="listSeason">
            { historyData.map((item, index) => ((
                    <div className="nameSeason" key={index}>{item.name}</div>
                    )))
                }
            </div>
        </div>
        <div className="historyMain">

            { historyData[0] && <div className="listCursesMember">
                <div className="historyMember">{historyData[0].data[0].name}</div>
                { historyData[0].data[0].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item}</div>
                    )))
                }
            </div>}
            {historyData[0] && <div className="listCursesMember">
                <div className="historyMember">{historyData[0].data[1].name}</div>
                { historyData[0].data[1].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item}</div>
                    )))
                }
            </div>}
            <div>
                <iframe
                width="900"
                height="500"
                src="https://www.youtube.com/embed/xyJ1gpduv8I?si=9sUwuaz8W4KjpGWw?fs=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                ></iframe>
            </div>
            {historyData[0] && <div className="listCursesMember">
                <div className="historyMember">{historyData[0].data[2].name}</div>
                { historyData[0].data[2].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item}</div>
                    )))
                }
            </div>}
            {historyData[0] && <div className="listCursesMember">
                <div className="historyMember">{historyData[0].data[3].name}</div>
                { historyData[0].data[3].curses.map((item, index) => ((
                    <div className="historyCurse" key={index}>{item}</div>
                    )))
                }
            </div>}
        </div>
    </div>
  );
};
