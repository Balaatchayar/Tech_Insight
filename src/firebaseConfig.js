import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDAngaAOflPULInZJjAKFYZGX8X6KtQMPk",
  authDomain: "my-articles-29609.firebaseapp.com",
  projectId: "my-articles-29609",
  storageBucket: "my-articles-29609.appspot.com",
  messagingSenderId: "889616586488",
  appId: "1:889616586488:web:8f879320e21d63ef92cd0d"
};

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);