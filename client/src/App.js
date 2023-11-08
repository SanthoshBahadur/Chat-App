import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register.jsx";
import SetAvatar from "./pages/SetAvatar.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="setavatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        {/* Allows you to navigate to any components when the subdomain matches. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
