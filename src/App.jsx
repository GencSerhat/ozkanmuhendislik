// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Blog liste sayfası (isteğe bağlı) */}
          <Route path="/blog" element={<BlogList />} />
          {/* Blog detay sayfası (slug ile) */}
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
