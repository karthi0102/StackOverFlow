
import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCimi_G4jDeOeglGnFVC0VqvBqoW0yUSfs",
  authDomain: "stackoverflow-clone-359810.firebaseapp.com",
  projectId: "stackoverflow-clone-359810",
  storageBucket: "stackoverflow-clone-359810.appspot.com",
  messagingSenderId: "191289815767",
  appId: "1:191289815767:web:aac07e2240d6d5cc613692"
};


const firebase = initializeApp(firebaseConfig);

export default firebase