/* eslint-disable react-hooks/exhaustive-deps */
import "./info.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UpdateAdmin } from "../../components/reload/updateAdmin";

export const Info = () => {
  const navigate = useNavigate();
  let admin = useSelector((state) => state.table.adminData);
  const [search, setSearch] = useState("");
  const [chance, setChance] = useState();
  const [statusVictoryElement, setStatusVictoryElement] = useState(false);
  const [generalChance, setGeneralChance] = useState();
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    if (admin.curses) {
      setSearchResult(admin.curses);
      const chanceCurse = 100 / admin.curses.filter((item) => !item.general).length;
      const chanceGeneralCurse =
        100 / admin.curses.filter((item) => item.general).length;
      setChance(chanceCurse.toFixed(2));
      setGeneralChance(chanceGeneralCurse.toFixed(2));
    }
  }, [admin.curses]);

  useEffect(() => {
    if (admin.curses) {
      const res = admin.curses.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(res);
    }
  }, [search]);

  return (
    <div className="info">
      {statusVictoryElement && <div className="conditionsVictory">
        <div className="conditionsHeader">
        <div></div>
        <h2>{admin.gameName }</h2>
        <div
          className="closePage"
          onClick={() => {
            setStatusVictoryElement(false);
          }}
        ></div>
        </div>
        <div className="conditions">
          <span>Условия победы:</span>
          {admin.conditions.map((item,index) => (
            <p>{index+1}. {item}</p>
          ))}
          <span>Пункты для колеса интерактива, влияющие на игроков:</span>
          <p>Проклятия - дебаффы на игроков, действующие до выполнения определённого условия. Одно проклятие крутится рандомно за 500 рублей доната через колесо рандома (рулетку) Donation Alerts. Каждые 5000 рублей на всех игроков накладывается одно общее проклятие (крутится в отдельном колесе ведущим). Общие проклятия удаляются из списка в колесе после выпадения до тех пор, пока они полностью не закончатся и список не обновится.</p>
          <p>Для зрителей есть возможность выкупить один пункт колеса (как личный так и общий) за 5000 рублей, рулетка DA с личными проклятиями в таком случае не крутятся, но срабатывает общее проклятие. Донатер сам выбирает: покрутить 10 колёс или выбрать один конкретный пункт (надо написать в донате) и такой выкуп не работает в последние 30 минут ивента.</p>
          <p>Уведомление игроков о полученных проклятиях происходит при помощи пуш уведомлений + помощь чата игрока (напоминания).Обязанность отметить выполнение проклятия в табличке лежит на стримере или его модераторе - нужно скинуть ник модератора с Твича в личку ведущему.
          </p>
          <p>Колёса, прокрученные во время трештока (подготовки к ивенту за час до его начала) работают и записываются и действуют в первом забеге и далее.</p>
        </div>
        </div>}
      <UpdateAdmin />
      <div className="headerInfo">
        <div className="logoInfo"></div>
        <input
          className="searchInfo"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <div className="buttonConditionsVictory" onClick={() => setStatusVictoryElement(true)}>Условия победы</div>
        <div
          className="closePage"
          onClick={() => {
            navigate("/");
          }}
        ></div>
      </div>
      {admin.curses !== undefined && admin.curses.length > 0 ? (
        <div className="containInfo">
          {searchResult !== null &&
            searchResult?.map((item, index) => (
              <div className="infoItem" key={index}>
                {item?.image?.icon && (
                  <div className="headerItem">
                    <img
                      className="iconItem"
                      alt=""
                      src={item.image.icon}
                    ></img>
                    <div className="nameItem">{item.name}</div>
                  </div>
                )}
                {!item?.image?.icon && (
                  <div
                    className="nameItem"
                    style={{ width: "100%", borderRadius: "5px" }}
                  >
                    {item.name}
                  </div>
                )}
                <div className="descriptionItem">
                  <span>{item.title}</span>
                  {admin?.curseBG && <img src={admin.curseBG} alt=""></img>}
                </div>
                <div className="chanceItem">
                  {item.general
                    ? `Общее проклятие. Шанс ${generalChance}%`
                    : `Шанс выпадения ${chance}%`}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};
