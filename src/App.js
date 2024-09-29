import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App(props) {
  const [fcm, setFCM] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const fcmx = localStorage.getItem("fcm") || "";

      setFCM(fcmx);
    }, 2000);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>FCM Generator - Farhan Aziz F</p>
        <p style={{ maxWidth: "100%", fontSize: 19, marginBottom: 0 }}>
          Here the FCM you need to copy or you can see on console.log
        </p>
        {fcm ? <p style={{ maxWidth: "100%", fontSize: 13 }}>{fcm}</p> : null}
      </header>
    </div>
  );
}

export default App;
