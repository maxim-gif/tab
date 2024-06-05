import './main.css';
import { useState, useEffect} from 'react'
import { SelectCurse } from '../../components/list/list';
import { getData, Curse,Delete,doneCurse,getToken, getUserData,addUser, GetModerators} from '../../api';
import { DataSubscriber } from '../../components/reload/reload';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'



export const Main = () => {

  const navigate = useNavigate()
  const dataPar = useSelector((state) => state.table.participant);
  let dataModerators = useSelector((state) => state.table.moderators)

  const [name, setName] = useState('')
  const [moderatorsAccess, setModeratorsAccess] = useState(false)
  const [cursePar1, setCursePar1] = useState([])
  const [cursePar2, setCursePar2] = useState([])
  const [cursePar3, setCursePar3] = useState([])
  const [cursePar4, setCursePar4] = useState([])


  const hash = document.location.href
    const splitHash = hash.split('&')[0]
    let code = splitHash.split('=')[1]
  
    const handleGetModerators = async() => {
      const data = await GetModerators()
      if (data !== null) {
        setModeratorsAccess(data.includes(name))
      } else {
        setModeratorsAccess(false)
      }
      
    }

  const hundleData = async() => {
    const res = await getData()
    setCursePar1(res?.par1 === undefined ? []: res.par1)
    setCursePar2(res?.par2 === undefined ? []: res.par2)
    setCursePar3(res?.par3 === undefined ? []: res.par3)
    setCursePar4(res?.par4 === undefined ? []: res.par4)
  }

  const getUser = async() => {
    const token = (window.localStorage.getItem('access_token'))
    console.log(token);
    const userData = await getUserData(token)
  if (userData) {
    setName(userData[0].display_name)
  }
    // console.log(userData[0]);
    
  }

  const auth = async(code) => {
    const token = await getToken(code)
    console.log(token);
    window.localStorage.setItem('access_token', token.access_token)
    window.localStorage.setItem('refresh_token', token.refresh_token)
    const userData = await getUserData(token.access_token)
    
    console.log(userData === undefined ? null:userData[0]);
    addUser(userData[0].id,userData[0].display_name)
    setName(userData[0].display_name)
    // const user = await GetAuth(userData[0].email,userData[0].id)
    // console.log(user);
    navigate("/")
  }

  useEffect(() => {
    if (code !== undefined) {
      auth(code)
      code = undefined
    } else {
      if (window.localStorage.getItem('access_token')) {
        getUser()
      }
    }
    handleGetModerators()
  }, []);

  useEffect(() => {
    handleGetModerators()
  }, [name]);

  useEffect(() => {
    setCursePar1(dataPar?.par1 === undefined ? []: dataPar.par1)
    setCursePar2(dataPar?.par2 === undefined ? []: dataPar.par2)
    setCursePar3(dataPar?.par3 === undefined ? []: dataPar.par3)
    setCursePar4(dataPar?.par4 === undefined ? []: dataPar.par4)
  }, [dataPar]);

  useEffect(() => {
    handleGetModerators()
  }, [dataModerators]);


const addCurse = async(e, participant) => {

    const data = [cursePar1, cursePar2, cursePar3, cursePar4]
    const selectElement = ["mySelect1", "mySelect2", "mySelect3", "mySelect4"]

    const setData = [function() {setCursePar1(cursePar1)},
                     function() {setCursePar2(cursePar2)},
                     function() {setCursePar3(cursePar3)},
                     function() {setCursePar4(cursePar4)}]

    if (e.target.value === "Мутант") {
      console.log(participant);
      console.log(data[participant]);
      data[participant].push({status:false,name:e.target.value, title: "Игрок 1/2/3/4 обязан следующей мутацией взять цветную мутацию НЕ самого прокаченного цвета. Пример: если у стримера 10 брутальности и 2 и 4 тактики и живучести, он должен брать зелёные или фиолетовые мутации. Бесцветные брать нельзя, когда есть проклятие мутанта."})
      setData[participant]()
    }
    if (e.target.value === "Кузнец") {
      data[participant].push({status:false, name:e.target.value, title: "Игрок 1/2/3/4 обязан рерольнуть статы на основном или побочном оружии, если хватает денег. Проклятие не сбрасывается, если маленький кузнец еще не появлялся, и переходит на следующие комнаты."})
      setData[participant]()
    }
    if (e.target.value === "Мимик") {
      data[participant].push({status:false,name:e.target.value, title: "Игроку 1/2/3/4 запрещается открывать следующий золотой сундук."})
      setData[participant]()
    }
    if (e.target.value === "Обжора") {
      data[participant].push({status:false,name:e.target.value, title: "Персонаж Игрока 1/2/3/4 наелся. Запрещается использовать следующую встреченную еду. Еду желательно сразу продать, если уже открыта переработка. Если это еда из магазина, то запрещается покупать ту еду, на которую хватает денег слева направо соответственно количеству проклятий, проклятия сразу сбрасываются, когда увидел еду в магазе, на которую хватает денег. Бутылка в магазине считается едой. "})
      setData[participant]()
    }
    Curse(participant,data[participant])
    document.getElementById(selectElement[participant]).value = "";
}


const deleteCurse = (id,arr,index) => {
  arr.splice(index,1)
  Delete(id,arr)
  if (id === 0) {
    setCursePar1(arr)
  } else if (id === 1) {
    setCursePar2(arr)
  } else if (id === 2) {
    setCursePar3(arr)
  } else {
    setCursePar4(arr)
  }

  console.log(arr.length);
}

  return (
   <div className="containerApp">
    <div className="logo">
    <div className="enter">
        {name.length === 0  && <span >Войти с помощью </span>}
        <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=9tme6blew754pa56v75lf5mgqg0iro&redirect_uri=http://localhost:3000&scope=user:read:email" >
          <div className="twitch"></div>
        </a>
        {name !== "" && <span>{name} {moderatorsAccess}</span>}
    </div>
    </div>
   
    <DataSubscriber/>
      <div className="app">
        <div>
          <div className="participant" style={{gridTemplateRows: `repeat(${cursePar1.length}, 25px)`}}>
            <div className="participantName">Участник №1</div>
            {cursePar1?.map((item, index) => ((<div id={index + "par1"} title={item.title} key={index} className={item.status ? "curseDone":"curse"}>
                <span>{item.name}</span>
                {moderatorsAccess && <div className="done" onClick={() => {doneCurse(0,index,!item.status)}}></div>}
                {moderatorsAccess && <div className="delete" onClick={() => {deleteCurse(0,cursePar1,index)}}></div>}
              </div>)))}
          </div>
          {moderatorsAccess && <SelectCurse addCurse={addCurse} id={0}/>}
        </div>

        <div>
          <div className="participant" style={{gridTemplateRows: `repeat(${cursePar2.length}, 25px)`}}>
            <div className="participantName">Участник №2</div>
            {cursePar2?.map((item, index) => ((<div id={index + "par2"} title={item.title} key={index} className={item.status ? "curseDone":"curse"}>
                <span>{item.name}</span>
                {moderatorsAccess && <div className="done" onClick={() => {doneCurse(1,index,!item.status)}}></div>}
                {moderatorsAccess && <div className="delete" onClick={() => {deleteCurse(1,cursePar2,index)}}></div>}
              </div>)))}
          </div>
          {moderatorsAccess && <SelectCurse addCurse={addCurse} id={1}/>}
        </div>

        <div>
          <div className="participant" style={{gridTemplateRows: `repeat(${cursePar3.length}, 25px)`}}>
            <div className="participantName">Участник №3</div>
            {cursePar3?.map((item, index) => ((<div id={index + "par3"} title={item.title} key={index} className={item.status ? "curseDone":"curse"}>
                <span>{item.name}</span>
                {moderatorsAccess && <div className="done" onClick={() => {doneCurse(2,index,!item.status)}}></div>}
                {moderatorsAccess && <div className="delete" onClick={() => {deleteCurse(2,cursePar3,index)}}></div>}
              </div>)))}
          </div>
          {moderatorsAccess && <SelectCurse addCurse={addCurse} id={2}/>}
        </div>

        <div>
          <div className="participant" style={{gridTemplateRows: `repeat(${cursePar4.length}, 25px)`}}>
            <div className="participantName">Участник №4</div>
            {cursePar4?.map((item, index) => ((<div id={index + "par4"} title={item.title} key={index} className={item.status ? "curseDone":"curse"}>
                <span>{item.name}</span>
                {moderatorsAccess && <div className="done" onClick={() => {doneCurse(3,index,!item.status)}}></div>}
                {moderatorsAccess && <div className="delete" onClick={() => {deleteCurse(3,cursePar4,index)}}></div>}
              </div>)))}
          </div>
          {moderatorsAccess && <SelectCurse addCurse={addCurse} id={3}/>}
        </div>
      </div>
    </div>
  );
}
