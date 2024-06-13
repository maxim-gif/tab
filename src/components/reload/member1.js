import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember1} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';


export const Member1Subscriber = () => {
 
  const dataLengthRef = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member1/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || -1;
      console.log(data?.length);      dispatch(setMember1(data));
      if (newDataLength > dataLengthRef.current) {
        if (dataLengthRef.current !== 0) {
          const name = window.localStorage.getItem("name")
          const members = JSON.parse(localStorage.getItem('members'));
          if (name === members[0]) {
           const not = new Notification("Добавлено новое проклятие", {
              body: data[data?.length - 1].name,
              icon: './img/goodday.png'
            });
            setTimeout(() => {
              not.close();
            }, 2000);
          }
        }
      }
      dataLengthRef.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};