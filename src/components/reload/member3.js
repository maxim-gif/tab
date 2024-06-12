import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember3} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member3Subscriber = ({name, userName}) => {
  console.log(name);
  console.log(userName);
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
          new Notification("Добавлено новое проклятие");
        }
      }
      dataLengthRef2.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};