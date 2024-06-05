import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMember2} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member2Subscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member2/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setMember2(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};