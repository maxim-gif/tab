import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAdminData} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UpdateAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'adminData/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setAdminData(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};