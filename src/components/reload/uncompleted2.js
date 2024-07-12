import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUncompleted2} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UncompletedSubscriber2 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'uncompleted2/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setUncompleted2(data));
    });
    return () => unsubscribe()
    
  }, [dispatch]);

  return null; 
};