import React from "react";
import { useContext } from "react";

import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Tests from "./pages/tests"
import Test from "./pages/test"
import TestCreation from "./pages/testCreation"
import TestResult from "./pages/testResult"

function App() {

  const {user } = useContext(UserContext)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}/>
        <Route path="/profile/:userId" element={<Profile />}/>
        <Route path="/login" element={user? <Navigate replace to="/"/> : <Login />}/>
        <Route path="/register" element={user? <Navigate replace to="/"/> : <Register />}/>
        <Route path="/messenger" element={user? <Messenger/> : <Login />}/>
        <Route path="/tests" element={user? <Tests/> : <Login />}/>
        <Route path="/test/:testId" element={user? <Test/> : <Login />}/>
        <Route path="/test/result/:testId" element={user? <TestResult/> : <Login />}/>
        <Route path="/test/creation" element={user? <TestCreation/> : <Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
