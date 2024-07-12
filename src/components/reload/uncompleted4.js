import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUncompleted4} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UncompletedSubscriber4 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'uncompleted4/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setUncompleted4(data));
    });
    return () => unsubscribe()
    
  }, [dispatch]);

  return null; 
};