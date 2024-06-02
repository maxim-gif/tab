import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { setParticipant } from "./store/slice/slice";

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
const auth = getAuth();
const db = getDatabase(app);

export async function getData() {
  
    const response = await fetch("https://table-d13fe-default-rtdb.firebaseio.com/pars.json");
    const data = await response.json();
    return data;
}

export async function GetAuth(email,password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export async function Enter(email,password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
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

export async function Delete(id, data) {
  const list = ["par1/","par2/","par3/","par4/"]
  try {
    const userRef = ref(db, 'pars/' + list[id]);
    await set(userRef, data);
  } catch (error) {
    console.log(error);
  }
}

export async function doneCurse(id, curse,status) {
  const list = ["par1/","par2/","par3/","par4/"]
  try {
    const curseRef = ref(db, 'pars/' + list[id] + curse);
    await update(curseRef, {status:status});
  } catch (error) {
    console.log(error);
  }
}