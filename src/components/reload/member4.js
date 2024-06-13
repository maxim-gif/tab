import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember4} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member4Subscriber = () => {
  const dataLengthRef3 = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member4/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || -1;
      dispatch(setMember4(data));
      if (newDataLength > dataLengthRef3.current) {
        console.log(newDataLength);
        console.log(dataLengthRef3.current);
        if (dataLengthRef3.current !== 0) {
          const name = window.localStorage.getItem("name")
          const members = JSON.parse(localStorage.getItem('members'));
          if (name === members[3]) {
           const not4 = new Notification("Добавлено новое проклятие", {
              body: data[data?.length - 1].name,
              icon: './img/goodday.png'
            });
            setTimeout(() => {
              not4.close();
            }, 2000);
          }
        }
      }
      dataLengthRef3.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};