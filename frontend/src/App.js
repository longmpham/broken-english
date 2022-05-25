import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import Translate from "./components/Conversation/Translate";
import ConversationList from "./components/Conversation/ConversationList";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./components/Conversation/Chat";
import Conversation from "./components/Conversation/Conversation";

import "./Styles/variables.scss";
// import "./sass.scss";
import { myContext } from "./Context";
import Profile from "./components/Profile/Profile";

const App = () => {
  // const userObject = React.useContext(myContext);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/conversations" element={<ConversationList />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/conversation/:id" element={<Conversation />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
