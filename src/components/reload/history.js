import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDatabase, ref, onValue } from 'firebase/database';
import { setHistory } from '../../store/slice/slice';

export const HistorySubscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'historys/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setHistory(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};