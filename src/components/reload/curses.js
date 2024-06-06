import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurses} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const CursesSubscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'curses/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setCurses(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};