import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUncompleted3} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UncompletedSubscriber3 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'uncompleted3/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setUncompleted3(data));
    });
    return () => unsubscribe()
    
  }, [dispatch]);

  return null; 
};