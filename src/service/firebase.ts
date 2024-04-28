// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB79eM4EQl_mSpQ5gvQUO7o4JQ6CBokgCA",
	authDomain: "test-login-react-f7ba0.firebaseapp.com",
	projectId: "test-login-react-f7ba0",
	storageBucket: "test-login-react-f7ba0.appspot.com",
	messagingSenderId: "479775052909",
	appId: "1:479775052909:web:c34f5673c2143db3915b64",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
