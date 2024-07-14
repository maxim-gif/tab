import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setParticipantData} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UpdateParticipant = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'participantData/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      for (let index = 0; index < 4; index++) {
        if (data !== null && data[index]) {
          const sort = [...new Set(data[index].uncompletedCursesList)]
          const getIndex = (name) => {
            const index = sort.indexOf(name);
            return index === -1 ? Infinity : index;
          }
          if (data[index].curses !== undefined) {
            data[index].curses.sort((a, b) => getIndex(a.name) - getIndex(b.name));
          }
         
        } 
      }
       

      dispatch(setParticipantData(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};