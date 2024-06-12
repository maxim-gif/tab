import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMember1} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const Member1Subscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'member1/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setMember1(data));
      
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};