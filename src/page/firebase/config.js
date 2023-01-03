// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import firebase from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDvTDatTSf2lQ601NWPF5A_5qh4McdyqfM",
//     authDomain: "blog-2012.firebaseapp.com",
//     projectId: "blog-2012",
//     storageBucket: "blog-2012.appspot.com",
//     messagingSenderId: "630779913044",
//     appId: "1:630779913044:web:4574984594fc4c88835ec1"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDer281Xl5CXLv20ZjoPrt8WRrTksSD2iw",
    authDomain: "thuenha-9803e.firebaseapp.com",
    projectId: "thuenha-9803e",
    storageBucket: "thuenha-9803e.appspot.com",
    messagingSenderId: "695392567341",
    appId: "1:695392567341:web:4eb87113f962b9f3da38a4",
    measurementId: "G-GYF0ZHD3N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);