import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember3} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';


export const Member3Subscriber = () => {
  const dataLengthRef2 = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member3/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || -1;
      dispatch(setMember3(data));
      if (newDataLength > dataLengthRef2.current) {
        const name = window.localStorage.getItem("name")
        const members = JSON.parse(localStorage.getItem('members'));
        if (dataLengthRef2.current !== 0) {
          if (name === members[2]) {
            new Notification("Добавлено новое проклятие", {
              body: data[data?.length - 1].name,
              icon: './img/goodday.png'
            });
          }
        }
      }
      dataLengthRef2.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};