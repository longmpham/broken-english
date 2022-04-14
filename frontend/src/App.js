import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom"

import Conversation from "./components/Conversation/Conversation";
import ConversationList from "./components/Conversation/ConversationList";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Navbar from "./components/Navbar/Navbar";

const App = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <ConversationList />
      <Conversation />
    </div>
  );
};

export default App;
