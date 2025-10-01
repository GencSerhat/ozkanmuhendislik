// src/App.jsx
import { useEffect } from "react";
import Home from "./pages/home/Home";
import "./App.css";

// ⬇️ Ekleyin
import { getAbout } from "./services/about";

function App() {
  useEffect(() => {
    getAbout()
      .then((data) => {
        console.log("ABOUT DATA 👉", data);
      })
      .catch((err) => {
        console.error("ABOUT ERROR ❌", err);
      });
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
