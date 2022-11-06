
import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDDgB715X1HSFHBSZT_Al7bpj6RFjzMu-k",
  authDomain: "stack-overflow-ed187.firebaseapp.com",
  projectId: "stack-overflow-ed187",
  storageBucket: "stack-overflow-ed187.appspot.com",
  messagingSenderId: "680786820579",
  appId: "1:680786820579:web:73d856576e308923ddb4d6",
  measurementId: "G-ZH26WSMXN7"
};
const firebase = initializeApp(firebaseConfig);

export default firebase