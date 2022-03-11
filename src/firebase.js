import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	// Initialize Firebase
}

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
