import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getMessaging } from "firebase/messaging"
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
const messaging = getMessaging(app);
export const auth = getAuth();
const db = getDatabase(app);

export async function getDataMember(id) {
    const members = ["member1", "member2", "member3","member4"]
    const response = await fetch(`https://table-d13fe-default-rtdb.firebaseio.com/` + members[id] +`.json`);
    const data = await response.json();
    return data;
}

export async function getCurses() {
  const response = await fetch(`https://table-d13fe-default-rtdb.firebaseio.com/curses.json`);
  const data = await response.json();
  return data;
}
export async function getNameMembers() {
  const response = await fetch(`https://table-d13fe-default-rtdb.firebaseio.com/members.json`);
  const data = await response.json();
  return data;
}

export async function addNameMembers(data) {
  try {
    if (!auth.currentUser) {
      throw new Error("Доступ запрещен")
    } else {
      const userRef = ref(db, 'members/');
      await set(userRef, data);
    }
    
  } catch (error) {
    return error.message
  }
}

export async function addListCurses(data) {
  try {
    if (!auth.currentUser) {
      throw new Error("Доступ запрещен")
    } else {
      const userRef = ref(db, 'curses/');
      await set(userRef, data);
    }
  } catch (error) {
    return error.message
  }
}

export async function GetAuth(email,password) {
  console.log(email);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    return user
  })
  .catch((error) => {
    console.log(error);
  });
}

export async function GetModerators () {
  const response = await fetch("https://table-d13fe-default-rtdb.firebaseio.com/moderators.json");
  const data = await response.json();
  return data;
}


export async function Enter(email,password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user.auth.currentUser
  } catch (error) {
    return error.message
  }
  // signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   const user = userCredential.user.auth.currentUser;
  //   console.log(user.uid);
  // })
  // .catch((error) => {
  //   console.log(error.message);
  // });
}

export async function addCurse(id, data) {
  const list = ["member1/","member2/","member3/","member4/"]
  try {
    const userRef = ref(db, list[id]);
    await set(userRef, data);
  } catch (error) {
    console.log(error);
  }
}

export async function sendModerator(data) {
  try {
    if (!auth.currentUser) {
      throw new Error("Доступ запрещен")
    } else {
      const userRef = ref(db, 'moderators/');
      await set(userRef, data);
    }
  } catch (error) {
    return error.message
  }
}

export async function Delete(id, data) {
  const list = ["member1/","member2/","member3/","member4/"]
  try {
    const userRef = ref(db, list[id]);
    await set(userRef, data);
  } catch (error) {
    console.log(error);
  }
}

export async function doneCurse(id, curse,status) {
  const members = ["member1/","member2/","member3/","member4/"]
  try {
    const curseRef = ref(db, members[id] + curse);
    await update(curseRef, {status:status});
  } catch (error) {
    console.log(error);
  }
}



export async function getUserToken(code) {
  const url = 'https://id.twitch.tv/oauth2/token';
  const params = new URLSearchParams();
  params.append('client_id', '9tme6blew754pa56v75lf5mgqg0iro');
  params.append('client_secret', 'ls1nk9j93maxa6g94j9fckch0m8you');
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', 'https://tab-jet.vercel.app');

 const getToken = await fetch(url, {
  method: 'POST',
  body: params
})
const token = await getToken.json()
return token
}

export async function getUserData(token) {
  const url1 = 'https://api.twitch.tv/helix/users';

  const userData = await fetch(url1, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-Id': '9tme6blew754pa56v75lf5mgqg0iro'
    }
  }) 
  const user = await userData.json()
  return user.data
}

export async function addUser(id,name) { 
  try {
    const userRef = ref(db, 'users/' + String(id));
    await set(userRef, {id:id,name:name});
  } catch (error) {
    console.log(error);
  }
 
}

export async function Rename(id,name) { 
  try {
    const userRef = ref(db, 'members/' + String(id));
    await update(userRef, {id:name});
  } catch (error) {
    console.log(error);
  }
 
}