import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfo2lBM8an4PMZ9-EBY6BaqEhu20So938",
  authDomain: "netflixapp-c8ab7.firebaseapp.com",
  projectId: "netflixapp-c8ab7",
  storageBucket: "netflixapp-c8ab7.appspot.com",
  messagingSenderId: "65984299686",
  appId: "1:65984299686:web:177546f3d984968f3b6a67",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
