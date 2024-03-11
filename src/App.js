import "./App.css";
import Header from "./components/Header";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import AddStudent from "./components/AddStudent";


import EditStudent from "./components/EditStudent";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/AddStudent" element={<AddStudent />} />

            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Detail />} /> */}
            <Route path="/updateStudent/:id" element={<EditStudent />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
