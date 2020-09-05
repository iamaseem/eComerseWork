// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC4yrL4y2bw_Cnj_HRbX0CX9Sn7cHFd4l0",
  authDomain: "e---commerce-9ff1f.firebaseapp.com",
  databaseURL: "https://e---commerce-9ff1f.firebaseio.com",
  projectId: "e---commerce-9ff1f",
  storageBucket: "e---commerce-9ff1f.appspot.com",
  messagingSenderId: "897223476321",
  appId: "1:897223476321:web:4732f64b60f15abaa45620",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
