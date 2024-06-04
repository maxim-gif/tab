import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setParticipant , setModerators} from '../../store/slice/slice';
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
    const moderRef = ref(db, 'moderators/');
    const unsub = onValue(moderRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      dispatch(setModerators(data));
    });
    return () => {
      unsubscribe()
      unsub()
    }
  }, [dispatch]);

  return null; 
};
