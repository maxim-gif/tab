import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setWidgetCurses} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UpdateWidgetCurses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'widgetCurses/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setWidgetCurses(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};