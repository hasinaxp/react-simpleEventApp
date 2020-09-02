import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyDx9nCqtiE08q4KZNdkc_bSBUD4uexNNC0",
    authDomain: "event-app-9b588.firebaseapp.com",
    databaseURL: "https://event-app-9b588.firebaseio.com",
    projectId: "event-app-9b588",
    storageBucket: "event-app-9b588.appspot.com",
    messagingSenderId: "1051702025284",
    appId: "1:1051702025284:web:afaca688d3d60cf60e7011",
    measurementId: "G-3RJM6XVNQ1"
};
firebase.initializeApp(config);
const storage = firebase.storage()
export { storage, firebase as default};