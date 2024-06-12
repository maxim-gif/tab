import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember3} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member3Subscriber = () => {
  const dataLengthRef = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member3/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || 0;
      dispatch(setMember3(data));
      if (newDataLength > dataLengthRef.current) {
        new Notification("Добавлено новое проклятие");
      }
      dataLengthRef.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};