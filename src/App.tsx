import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import NotesListPage from "./components/NotesListPage";
import NotePage from "./components/NotePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
