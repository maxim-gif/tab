import { useEffect, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { setMember1} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';


export const Member1Subscriber = ({name, userName}) => {
 
  const dataLengthRef = useRef(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member1/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newDataLength = data?.length || 0;
      console.log(data?.length);      dispatch(setMember1(data));
      if (newDataLength > dataLengthRef.current) {
        if (dataLengthRef.current !== 0) {
          new Notification("Добавлено новое проклятие");
        }
      }
      dataLengthRef.current = newDataLength;
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};