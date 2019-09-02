import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyBa6oUEzuHFf4JeG7Wcmye5X5VUNJb0ivM",
  authDomain: "mypayments-38ef0.firebaseapp.com",
  databaseURL: "https://mypayments-38ef0.firebaseio.com",
  projectId: "mypayments-38ef0",
  storageBucket: "mypayments-38ef0.appspot.com",
  messagingSenderId: "624901039161",
  appId: "1:624901039161:web:f9f548e00b896794"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase;