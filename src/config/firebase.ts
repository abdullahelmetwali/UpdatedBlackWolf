import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXSwjNbvErgI4xmAuzjHwmE1JysZ_yppY",
    authDomain: "black-wolf-ecommerce.firebaseapp.com",
    projectId: "black-wolf-ecommerce",
    storageBucket: "black-wolf-ecommerce.firebasestorage.app",
    messagingSenderId: "853969376673",
    appId: "1:853969376673:web:ac4c961161d0e47e3927e0",
    measurementId: "G-W7JX9N3X0J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);