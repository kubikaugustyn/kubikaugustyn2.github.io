import firebase from "firebase"

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDpFpTJcokMT-dvIldxlK33hD93dVcFkwo",
authDomain: "react-game01.firebaseapp.com",
databaseURL: "https://react-game01.firebaseio.com",
projectId: "react-game01",
storageBucket: "react-game01.appspot.com",
messagingSenderId: "1075132574605",
appId: "1:1075132574605:web:4993facfbd837a9f63ebc4",
measurementId: "G-5614H37080"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
