import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setParticipantData} from '../../store/slice/slice';
import { getDatabase, ref, onValue } from 'firebase/database';

export const UpdateParticipant = () => {
  const dispatch = useDispatch();
  const sumRef = useRef([0,0,0,0])

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
            data[index].curses.sort(function(a, b) {
              return a.general === b.general ? 0 : a.general ? -1 : 1;
            });
            data[index].curses.sort(function(a, b) {
              if (a.completedCounter === a.totalCounter && b.completedCounter !== b.totalCounter) {
                return 1;
              } else if (a.completedCounter !== a.totalCounter && b.completedCounter === b.totalCounter) {
                return -1;
              } else {
                return 0;
              }
            })
          }

          let sum = [0,0,0,0];
          if (data[index].curses) {
            data[index].curses.forEach((item) => {
              sum[index] += item.totalCounter;
            });
          } else {
            sum[index] = -1
          }


          if (sum[index] > sumRef.current[index]) {
            if (sumRef.current[index] !== 0) {
              const name = window.localStorage.getItem("name")
              const members = JSON.parse(localStorage.getItem('members'));
              if (name === members[index]?.split(' & ')[0] || name === members[0]?.split(' & ')[1]) {
               const not = new Notification("Добавлено новое проклятие", {
                  body: data[data?.length - 1].name,
                  icon: './img/goodday.png'
                });
                setTimeout(() => {
                  not.close();
                }, 1500);
              }
            }
          }
          sumRef.current[index] = sum[index]
        } 
      }


      dispatch(setParticipantData(data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; 
};