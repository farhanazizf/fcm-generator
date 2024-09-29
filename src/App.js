import logo from "./logo.svg";
import "./App.css";

function App(props) {
  const fcm = localStorage.getItem("fcm") || "";
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
