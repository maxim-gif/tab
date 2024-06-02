import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setParticipant } from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const DataSubscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'pars/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setParticipant(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};