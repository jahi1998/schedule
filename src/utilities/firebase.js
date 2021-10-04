import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useState, useEffect } from "react";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlf0oSv32nnbhaD2jA66IX0-0smMWtySk",
  authDomain: "myscheduler-1076a.firebaseapp.com",
  databaseURL: "https://myscheduler-1076a-default-rtdb.firebaseio.com",
  projectId: "myscheduler-1076a",
  storageBucket: "myscheduler-1076a.appspot.com",
  messagingSenderId: "379925258024",
  appId: "1:379925258024:web:acc7e90b2799ba1c757a1d",
  measurementId: "G-7GM01DWVQ4",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) {
      console.log(`loading ${path}`);
    }
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) {
          console.log(val);
        }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};
