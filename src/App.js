import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
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
          Below is the deviceId you need to Copy/Paste for test script or you
          can see on console.log
        </p>
        {fcm ? (
          <p style={{ maxWidth: "100%", fontSize: 13 }}>{fcm}</p>
        ) : (
          <p>on loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
