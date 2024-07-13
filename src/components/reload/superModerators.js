import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSuperModerators} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const SuperModeratorSubscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'superModerators/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setSuperModerators(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};