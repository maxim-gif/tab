import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember2} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member2Subscriber = () => {
  const sumRef2 = useRef(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member2/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      let sum = 0;
      if (data) {
        data.forEach((item) => {
          sum += item.totalCounter;
        });
      } else {
        sum = -1
      }
      dispatch(setMember2(data));
      if (sum > sumRef2.current) {
        if (sumRef2.current !== 0) {
          const name = window.localStorage.getItem("name")
          const members = JSON.parse(localStorage.getItem('members'));
        if (name === members[1]?.split(' & ')[0] || name === members[1]?.split(' & ')[1]) {
         const not2 =  new Notification("Добавлено новое проклятие", {
            body: data[data?.length - 1].name,
            icon: './img/goodday.png'
          });
          setTimeout(() => {
            not2.close();
          }, 1500);
        }
        }
      }
      sumRef2.current = sum
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};