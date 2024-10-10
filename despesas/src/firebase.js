import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAvFFuy-qwlykCQCB_0t786l3nJB6Bd6GI",
    authDomain: "myfinancasfb.firebaseapp.com",
    projectId: "myfinancasfb",
    storageBucket: "myfinancasfb.appspot.com",
    messagingSenderId: "281768201924",
    appId: "1:281768201924:web:e1cae87a99f2b6566f4391"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };