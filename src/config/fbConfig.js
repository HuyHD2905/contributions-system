import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCFhMGdv4H97_higrqmRoWE37sp3cv85GI",
	authDomain: "contribute-db.firebaseapp.com",
	databaseURL: "https://contribute-db.firebaseio.com",
	projectId: "contribute-db",
	storageBucket: "contribute-db.appspot.com",
	messagingSenderId: "593439960778",
	appId: "1:593439960778:web:06f22ac8e1a37260430e33",
	measurementId: "G-J6RNPL4XNL",
};

firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
