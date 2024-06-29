import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember1} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';


export const Member1Subscriber = () => {
 
  const sumRef = useRef(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member1/');
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
      dispatch(setMember1(data));
      if (sum > sumRef.current) {
        if (sumRef.current !== 0) {
          const name = window.localStorage.getItem("name")
          const members = JSON.parse(localStorage.getItem('members'));
          if (name === members[0]?.split(' & ')[0] || name === members[0]?.split(' & ')[1]) {
           const not = new Notification("Добавлено новое проклятие", {
              body: data[data?.length - 1].name,
              icon: './img/goodday.png'
            });
            setTimeout(() => {
              not.close();
            }, 1500);
          }
        }
      }
      sumRef.current = sum
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};