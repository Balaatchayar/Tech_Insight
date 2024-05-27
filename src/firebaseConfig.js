import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "API_KEY",
//   authDomain: "AUTH_DOMAIN",
//   projectId: "PROJECT_ID",
//   storageBucket: "STORAGE_BUCKET",
//   messagingSenderId: "MESSAGING_SENDER_ID",
//   appId: "APP_ID"
// };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);
