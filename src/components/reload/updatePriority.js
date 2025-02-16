import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPriorityData} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UpdatePriority = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'priorityCounter/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setPriorityData(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};