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
    apiKey: "AIzaSyABTixStKNRN5EjVzjGDTPEa8ZLSQl5FdY",
    authDomain: "apithuenha.firebaseapp.com",
    projectId: "apithuenha",
    storageBucket: "apithuenha.appspot.com",
    messagingSenderId: "717189961210",
    appId: "1:717189961210:web:efebcce73f67cedc188043",
    measurementId: "G-VKP7T0K5R1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);