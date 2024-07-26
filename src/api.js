import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ref as sRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqv9KvlyVN94mXloU1OzlMyvAgOBWUvWk",
  authDomain: "table-d13fe.firebaseapp.com",
  projectId: "table-d13fe",
  storageBucket: "table-d13fe.appspot.com",
  messagingSenderId: "251923195524",
  appId: "1:251923195524:web:65422f17335eaab459c4d1",
  measurementId: "G-6EQEBZBJXQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getDatabase(app);


export async function addUser(id, name) {
  try {
    const userRef = ref(db, "users/" + String(id));
    await set(userRef, { id: id, name: name });
  } catch (error) {
    console.log(error);
  }
}


export async function AddFile(name, data, fileName) {
  console.log(fileName);
  const storage = getStorage();
  const storageRef = sRef(storage, `${name}/${fileName}`);
  try {
    await uploadBytes(storageRef, data);
    const url = await getDownloadURL(sRef(storage, `${name}/${fileName}`));
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteFile(curseName, name) {
  console.log(`${curseName}/${name}`);
  const storage = getStorage();
  const storageRef = sRef(storage, `${curseName}/${name}`);
  try {
    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
  }
}

export async function getAdminData() {
  const response = await fetch(
    `https://table-d13fe-default-rtdb.firebaseio.com/adminData.json`
  );
  const data = await response.json();
  return data;
}

export async function updateAdminData(address, data) {
  try {
    if (!auth.currentUser) {
      throw new Error("Доступ запрещен");
    } else {
      const userRef = ref(db, "adminData/" + address);
      await set(userRef, data);
    }
  } catch (error) {
    return error.message;
  }
}

export async function getParticipantData() {
  const response = await fetch(
    `https://table-d13fe-default-rtdb.firebaseio.com/participantData.json`
  );
  const data = await response.json();
  return data;
}

export async function updateParticipantData(address, data) {
  try {
 
      const userRef = ref(db, "participantData/" + address);
      await set(userRef, data);
  
  } catch (error) {
    return error.message;
  }
}

















export async function getDataHistory() {
  const response = await fetch(
    `https://table-d13fe-default-rtdb.firebaseio.com/history.json`
  );
  const data = await response.json();
  return data;
}

export async function addDataHistory(data) {
  try {
    if (!auth.currentUser) {
      throw new Error("Доступ запрещен");
    } else {
      const userRef = ref(db, "history/");
      await set(userRef, data);
    }
  } catch (error) {
    return error.message;
  }
}


export async function GetAuth(email, password) {
  console.log(email);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}


export async function Enter(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.auth.currentUser;
  } catch (error) {
    return error.message;
  }
}

export async function getUserToken(code) {
  console.log(code);
  const url = "https://id.twitch.tv/oauth2/token";
  const params = new URLSearchParams();
  params.append("client_id", "9tme6blew754pa56v75lf5mgqg0iro");
  params.append("client_secret", "ls1nk9j93maxa6g94j9fckch0m8you");
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", "https://tab-jet.vercel.app");

  const getToken = await fetch(url, {
    method: "POST",
    body: params,
  });
  const token = await getToken.json();
  return token;
}

export async function refreshToken() {
  const url = "https://id.twitch.tv/oauth2/token";
  const params = new URLSearchParams();
  params.append("client_id", "9tme6blew754pa56v75lf5mgqg0iro");
  params.append("client_secret", "ls1nk9j93maxa6g94j9fckch0m8you");
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", window.localStorage.getItem("refresh_token"));

  const getToken = await fetch(url, {
    method: "POST",
    body: params,
  });
  const token = await getToken.json();
  window.localStorage.setItem("access_token", token.access_token);
  window.localStorage.setItem("refresh_token", token.refresh_token);
  return token.access_token;
}

export async function getUserData(token) {
  const url1 = "https://api.twitch.tv/helix/users";

  const userData = await fetch(url1, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": "9tme6blew754pa56v75lf5mgqg0iro",
    },
  });
  const user = await userData.json();
  return user;
}



export async function Rename(id, name) {
  try {
    const userRef = ref(db, "members/" + String(id));
    await update(userRef, { id: name });
  } catch (error) {
    console.log(error);
  }
}
