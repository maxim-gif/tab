import { useEffect, useRef,useState  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember3} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member3Subscriber = ({name, userName}) => {
  const [name1, setName1] = useState(name);
  const [name2, setName2] = useState(userName);
  const dataLengthRef2 = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member3/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || 0;
      dispatch(setMember3(data));
      if (newDataLength > dataLengthRef2.current) {
        if (dataLengthRef2.current !== 0) {
          if (name1 === name2) {
            console.log("yes");
            new Notification("Добавлено новое проклятие");
          } else {
            console.log(name);
            console.log(userName);
            console.log(String(name) === String(userName));
            console.log("not");
          }
        }
      }
      dataLengthRef2.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};