import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember4} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member4Subscriber = () => {
  const sumRef4 = useRef(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member4/');
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
      dispatch(setMember4(data));
      if (sum > sumRef4.current) {
        if (sumRef4.current !== 0) {
          const name = window.localStorage.getItem("name")
          const members = JSON.parse(localStorage.getItem('members'));
          if (name === members[3]?.split(' & ')[0] || name === members[3]?.split(' & ')[1]) {
           const not4 = new Notification("Добавлено новое проклятие", {
              body: data[data?.length - 1].name,
              icon: './img/goodday.png'
            });
            setTimeout(() => {
              not4.close();
            }, 1500);
          }
        }
      }
      sumRef4.current = sum
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};