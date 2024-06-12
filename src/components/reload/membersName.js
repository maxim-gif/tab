import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNameMembers} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const MembersSubscriber = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'members/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setNameMembers(data));
      localStorage.setItem('members', JSON.stringify(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};