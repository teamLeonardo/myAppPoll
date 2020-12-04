import firebase from 'firebase';
export const firebaseConfig = {
    apiKey: "AIzaSyAJJRMs6ZUvNwy9vsOqlQFMqZkeQ-our-c",
    authDomain: "poll-987fd.firebaseapp.com",
    databaseURL: "https://poll-987fd.firebaseio.com",
    projectId: "poll-987fd",
    storageBucket: "poll-987fd.appspot.com",
    messagingSenderId: "108527827297",
    appId: "1:108527827297:web:160ff8a0a6e1a03304ad20",
    measurementId: "G-WSF9PS6WV7"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore()
export const fire = firebase

