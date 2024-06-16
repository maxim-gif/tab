import './addCurse.css';
import { useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { addListCurses } from '../../api';
import { AddFile } from '../../api';


export const AddList = ({setMessage}) => {

  const curses = useSelector((state) => state.table.curses);

  const [loading, setLoading] = useState(false);
  const [curseName, setCurseName] = useState("");
  const [curseTitle, setCurseTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [firstFile, setFirstFile] = useState('');
  const [secondFile, setSecondFile] = useState('');
  const [thirdFile, setThirdFile] = useState('');

 
  const addCurse = async() => {
    setLoading(true)
    let imagesUrl = []
    let imagesName = []
    if (firstFile !== '') {
     const url = await AddFile(curseName,firstFile,firstFile.name)
     imagesUrl.push(url)
     imagesName.push(firstFile.name)
    }
    if (secondFile !== '') {
      const url = await AddFile(curseName,secondFile,secondFile.name)
      imagesUrl.push(url)
      imagesName.push(secondFile.name)
    }
    if (thirdFile !== '') {
      const url = await AddFile(curseName,thirdFile,thirdFile.name)
      imagesUrl.push(url)
      imagesName.push(thirdFile.name)
    }

    let newData 
    if (curses === null) {
      newData = []
    } else {
      newData = [...curses]
    }
    newData.push({name:curseName,title:curseTitle,general:checked,image:imagesUrl,imagesName:imagesName})
    const message = await addListCurses(newData)
    setCurseName("")
    setCurseTitle("")
    setMessage(message)
    setChecked(false)
    setFirstFile('')
    setSecondFile('')
    setThirdFile('')
    setLoading(false)
  }

const deleteImg = (e,index) => {
  e.preventDefault()
  index === 1 ? setFirstFile(''): index === 2 ? setSecondFile(''): setThirdFile('')
}

  return (
   <div className="addList">
        <input type='text' className="inputAdmin" value={curseName} placeholder='Введите название проклятия' onChange={(e) => {setCurseName(e.target.value)}}></input>
        <textarea className="curseTitle" value={curseTitle} placeholder='Описане проклятия' onChange={(e) => {setCurseTitle(e.target.value)}}></textarea>
        <div className="fileBox">
            <label className="file">
              {firstFile === '' && <input type='file' onChange={(e) => {setFirstFile(e.target.files[0])}}></input>}
              <img className="fileImg" src={firstFile ? URL.createObjectURL(firstFile):'/addImg.png'} alt=''></img>
              {firstFile !== '' && <div className="deleteFile" onClick={(e) => {deleteImg(e,1)}}></div>}
            </label>
            <label className="file">
              {secondFile === '' && <input type='file' onChange={(e) => {setSecondFile(e.target.files[0])}}></input>}
              <img className="fileImg" src={secondFile ? URL.createObjectURL(secondFile):'/addImg.png'} alt=''></img>
              {secondFile !== '' && <div className="deleteFile" onClick={(e) => {deleteImg(e,2)}}></div>}
            </label>
            <label className="file">
              {thirdFile === '' && <input type='file' onChange={(e) => {setThirdFile(e.target.files[0])}}></input>}
              <img className="fileImg" src={thirdFile ? URL.createObjectURL(thirdFile):'/addImg.png'} alt=''></img>
              {thirdFile !== '' && <div className="deleteFile" onClick={(e) => {deleteImg(e,3)}}></div>}
            </label>
          </div>
        <div className="checkBox">
          <input type="checkbox" id="check" className="check" checked={checked} onChange={(e) => setChecked(e.target.checked)}></input>
          <label htmlFor="check">Общее проклятие</label>
        </div>
   
        <button className="buttonAdmin" onClick={() => {addCurse()}} disabled={curseName === ""}>Добавить проклятие</button>
        {loading && <span>ЗАГРУЗКА</span>}
    </div>
  );
}