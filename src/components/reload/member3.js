import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember3} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';


export const Member3Subscriber = () => {
  const sumRef3 = useRef(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member3/');
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
      dispatch(setMember3(data));
      if (sum > sumRef3.current) {
        const name = window.localStorage.getItem("name")
        const members = JSON.parse(localStorage.getItem('members'));
        if (sumRef3.current !== 0) {
          if (name === members[2]?.split(' & ')[0] || name === members[2]?.split(' & ')[1]) {
            const not3 = new Notification("Добавлено новое проклятие", {
              body: data[data?.length - 1].name,
              icon: './img/goodday.png'
            });
            setTimeout(() => {
              not3.close();
            }, 1500);
          }
        }
      }
      sumRef3.current = sum
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};