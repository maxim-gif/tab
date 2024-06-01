import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCqv9KvlyVN94mXloU1OzlMyvAgOBWUvWk",
    authDomain: "table-d13fe.firebaseapp.com",
    projectId: "table-d13fe",
    storageBucket: "table-d13fe.appspot.com",
    messagingSenderId: "251923195524",
    appId: "1:251923195524:web:65422f17335eaab459c4d1",
    measurementId: "G-6EQEBZBJXQ"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export async function getData() {
    const response = await fetch("https://table-d13fe-default-rtdb.firebaseio.com/pars.json");
    const data = await response.json();
    return data;
}

export async function Curse(id, data) {
  const list = ["par1/","par2/","par3/","par4/"]
  try {
    const userRef = ref(db, 'pars/' + list[id]);
    await set(userRef, data);
  } catch (error) {
    console.log(error);
  }
 
}