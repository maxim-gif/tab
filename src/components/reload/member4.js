import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMember4} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member4Subscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member4/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setMember4(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};