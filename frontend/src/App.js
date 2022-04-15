import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom"

import Translate from "./components/Conversation/Translate";
import ConversationList from "./components/Conversation/ConversationList";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Navbar from "./components/Navbar/Navbar";
import Conversation from "./components/Conversation/Conversation";
import Chat from "./components/Conversation/Chat";

const App = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/conversations" element={<ConversationList />} />
          <Route path="/conversation/:id" element={<Conversation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <Translate />
      <Chat />
    </div>
  );
};

export default App;
