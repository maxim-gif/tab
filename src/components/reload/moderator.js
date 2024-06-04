import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setModerators} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const ModeratorSubscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'moderators/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setModerators(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};