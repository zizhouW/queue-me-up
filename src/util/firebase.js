import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: "AIzaSyCeFjz8D74S_eUe6g6DFCEB9MFOB73MJWg",
	authDomain: "queue-me-up.firebaseapp.com",
	databaseURL: "https://queue-me-up.firebaseio.com",
	projectId: "queue-me-up",
	storageBucket: "queue-me-up.appspot.com",
	messagingSenderId: "59079782968",
	appId: "1:59079782968:web:71f8308203e4045d5e6ccd",
	measurementId: "G-ZTY8H01CCW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
