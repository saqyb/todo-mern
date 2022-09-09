import Navbar from "./components/Navbar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

const Routing = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Logout' element={<Logout />} />
    </Routes>
  );
};

const App = () => {
  return (
    <>
      <div className='App'>
        <Navbar></Navbar>
        <Routing></Routing>
      </div>
    </>
  );
};
export default App;