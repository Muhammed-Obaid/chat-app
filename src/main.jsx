import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6sQ-CHKO492Ft2YmwYHSRljgJUVYBUb4",
  authDomain: "react-chat-app-1da7b.firebaseapp.com",
  databaseURL: "https://react-chat-app-1da7b-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-1da7b",
  storageBucket: "react-chat-app-1da7b.appspot.com",
  messagingSenderId: "693289461037",
  appId: "1:693289461037:web:a999315ea96ea6dde81fa4"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
