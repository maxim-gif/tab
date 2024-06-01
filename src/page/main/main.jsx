import './main.css';
import { useState,} from 'react'
import { SelectCurse } from '../../components/list/list';

export const Main = () => {

  const [par1, setPar1] = useState(1)
  const [par2, setPar2] = useState(1)
  const [par3, setPar3] = useState(1)
  const [par4, setPar4] = useState(1)

  const [cursePar1, setCursePar1] = useState([])
  const [cursePar2, setCursePar2] = useState([])
  const [cursePar3, setCursePar3] = useState([])
  const [cursePar4, setCursePar4] = useState([])

  const [cursesDone, setCursesDone] = useState([])

const addCurse = (e, participant) => {

    const data = [cursePar1, cursePar2, cursePar3, cursePar4]
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

    console.log(e.target.value);
    if (e.target.value === "Мутант") {
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
    document.getElementById(selectElement[participant]).value = "";
}

const Done = (id) => {
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
          <div className="participantName">Участник №1</div>
          {cursePar2.map((item, index) => ((<div id={index + "par2"} title={item.title} key={index} className="curse">
              <span>{item.name}</span>
              <div className="done" onClick={() => {Done(index + "par2")}}></div>
            </div>)))}
        </div>
        <SelectCurse addCurse={addCurse} id={1}/>
      </div>

      <div>
        <div className="participant" style={{gridTemplateRows: `repeat(${par3}, 25px)`}}>
          <div className="participantName">Участник №1</div>
          {cursePar3.map((item, index) => ((<div id={index + "par3"} title={item.title} key={index} className="curse">
              <span>{item.name}</span>
              <div className="done" onClick={() => {Done(index + "par3")}}></div>
            </div>)))}
        </div>
        <SelectCurse addCurse={addCurse} id={2}/>
      </div>

      <div>
        <div className="participant" style={{gridTemplateRows: `repeat(${par4}, 25px)`}}>
          <div className="participantName">Участник №1</div>
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
