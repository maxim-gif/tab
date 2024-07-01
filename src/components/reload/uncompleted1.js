import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUncompleted1} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UncompletedSubscriber1 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'uncompleted1/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setUncompleted1(data));
    });
    return () => unsubscribe()
    
  }, [dispatch]);

  return null; 
};