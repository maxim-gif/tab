import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember2} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member2Subscriber = () => {
  const dataLengthRef1 = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member2/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || -1;
      console.log(data);
      dispatch(setMember2(data));
      if (newDataLength > dataLengthRef1.current) {
        if (dataLengthRef1.current !== 0) {
          const name = window.localStorage.getItem("name")
        const members = JSON.parse(localStorage.getItem('members'));
        if (name === members[1]) {
          new Notification("Добавлено новое проклятие", {
            body: 'Have a good day',
            icon: './img/goodday.png'
          });
        }
        }
      }
      dataLengthRef1.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};