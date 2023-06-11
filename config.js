// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHFOtEPSOXRqJZUjIgGFLYW1H5WU8jTmA",
  authDomain: "awesome-project-9f984.firebaseapp.com",
  databaseURL:
    "https://awesome-project-9f984-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-project-9f984",
  storageBucket: "awesome-project-9f984.appspot.com",
  messagingSenderId: "619447487486",
  appId: "1:619447487486:web:abdaeda24e332e7152ceaf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
