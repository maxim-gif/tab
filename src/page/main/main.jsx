import './main.css';
import { useState, useEffect} from 'react'
import { SelectCurse } from '../../components/list/list';
import { getData, Curse} from '../../api';

export const Main = () => {
  // const [data, setData] = useState([])
 
  const hundleData = async() => {
    const res = await getData()
    // setData(res)
    setCursePar1(res.par1 === undefined ? []: res.par1)
    setCursePar2(res.par2 === undefined ? []: res.par2)
    setCursePar3(res.par3 === undefined ? []: res.par3)
    setCursePar4(res.par4 === undefined ? []: res.par4)
  }
  useEffect(() => {
    hundleData()
  }, []);

  getData()
  const [par1, setPar1] = useState(1)
  const [par2, setPar2] = useState(1)
  const [par3, setPar3] = useState(1)
  const [par4, setPar4] = useState(1)

  const [cursePar1, setCursePar1] = useState([])
  const [cursePar2, setCursePar2] = useState([])
  const [cursePar3, setCursePar3] = useState([])
  const [cursePar4, setCursePar4] = useState([])

  const [cursesDone, setCursesDone] = useState([])
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
const addCurse = async(e, participant) => {
    const data = [cursePar1, cursePar2, cursePar3, cursePar4]
    console.log(cursePar3);
    const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"]
    const setPar = [function() {setPar1(prevCount => prevCount + 1)},
                    function() {setPar2(prevCount => prevCount + 1)},
                    function() {setPar3(prevCount => prevCount + 1)},
                    function() {setPar4(prevCount => prevCount + 1)}]

    const setData = [function() {setCursePar1(cursePar1)},
                     function() {setCursePar2(cursePar2)},
                     function() {setCursePar3(cursePar3)},
                     function() {setCursePar4(cursePar4)}]

    setPar[participant]()

    if (e.target.value === "Мутант") {
      console.log(participant);
      console.log(data[participant]);
      data[participant].push({name:e.target.value, title: "Игрок 1/2/3/4 обязан следующей мутацией взять цветную мутацию НЕ самого прокаченного цвета. Пример: если у стримера 10 брутальности и 2 и 4 тактики и живучести, он должен брать зелёные или фиолетовые мутации. Бесцветные брать нельзя, когда есть проклятие мутанта."})
      setData[participant]()
    }
    if (e.target.value === "Кузнец") {
      data[participant].push({name:e.target.value, title: "Игрок 1/2/3/4 обязан рерольнуть статы на основном или побочном оружии, если хватает денег. Проклятие не сбрасывается, если маленький кузнец еще не появлялся, и переходит на следующие комнаты."})
      setData[participant]()
    }
    if (e.target.value === "Мимик") {
      data[participant].push({name:e.target.value, title: "Игроку 1/2/3/4 запрещается открывать следующий золотой сундук."})
      setData[participant]()
    }
    if (e.target.value === "Обжора") {
      data[participant].push({name:e.target.value, title: "Персонаж Игрока 1/2/3/4 наелся. Запрещается использовать следующую встреченную еду. Еду желательно сразу продать, если уже открыта переработка. Если это еда из магазина, то запрещается покупать ту еду, на которую хватает денег слева направо соответственно количеству проклятий, проклятия сразу сбрасываются, когда увидел еду в магазе, на которую хватает денег. Бутылка в магазине считается едой. "})
      setData[participant]()
    }
    Curse(participant,data[participant])
    document.getElementById(selectElement[participant]).value = "";
}

const Done = async(id) => { 
  const element = document.getElementById(id);
  if (cursesDone.includes(id)) {
    element.classList.remove("curseDone");
    const result = cursesDone.filter((item) => item !== id)
    setCursesDone(result)
  } else {
    cursesDone.push(id)
    setCursesDone(cursesDone)
    element.classList.add("curseDone");
  }
}

  return (
   <div className="app">
      <div>
        <div className="participant" style={{gridTemplateRows: `repeat(${par1}, 25px)`}}>
          <div className="participantName">Участник №1</div>
          {cursePar1.map((item, index) => ((<div id={index + "par1"} title={item.title} key={index} className="curse">
              <span>{item.name}</span>
              <div className="done" onClick={() => {Done(index + "par1")}}></div>
            </div>)))}
        </div>
        <SelectCurse addCurse={addCurse} id={0}/>
      </div>

      <div>
        <div className="participant" style={{gridTemplateRows: `repeat(${par2}, 25px)`}}>
          <div className="participantName">Участник №2</div>
          {cursePar2.map((item, index) => ((<div id={index + "par2"} title={item.title} key={index} className="curse">
              <span>{item.name}</span>
              <div className="done" onClick={() => {Done(index + "par2")}}></div>
            </div>)))}
        </div>
        <SelectCurse addCurse={addCurse} id={1}/>
      </div>

      <div>
        <div className="participant" style={{gridTemplateRows: `repeat(${par3}, 25px)`}}>
          <div className="participantName">Участник №3</div>
          {cursePar3.map((item, index) => ((<div id={index + "par3"} title={item.title} key={index} className="curse">
              <span>{item.name}</span>
              <div className="done" onClick={() => {Done(index + "par3")}}></div>
            </div>)))}
        </div>
        <SelectCurse addCurse={addCurse} id={2}/>
      </div>

      <div>
        <div className="participant" style={{gridTemplateRows: `repeat(${par4}, 25px)`}}>
          <div className="participantName">Участник №4</div>
          {cursePar4.map((item, index) => ((<div id={index + "par4"} title={item.title} key={index} className="curse">
              <span>{item.name}</span>
              <div className="done" onClick={() => {Done(index + "par4")}}></div>
            </div>)))}
        </div>
        <SelectCurse addCurse={addCurse} id={3}/>
      </div>

    </div>
  );
}
