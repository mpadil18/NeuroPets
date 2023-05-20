import "./App.css";
import Login from "./Login/Login"
import RegPage from "./Registration/RegPage";
import CreateGoal from "./CreateGoal/CreateGoal";
import Home from "./Home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // import the ProtectedRoute component
import { useState } from 'react';

//add additional paths to different pages using same syntax <Route path = "..." element = {<.../>} />
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log('isSignedIn:', isSignedIn);
  return (
    <BrowserRouter>
      <Routes>

        <Route path = "" element = {<Login setIsSignedIn={setIsSignedIn} />} /> 
        <Route path = "/" element = {<Login setIsSignedIn={setIsSignedIn} />} />
        <Route path = "/regPage" element = {<RegPage setIsSignedIn={setIsSignedIn} />} />
        <Route path= "/createGoal" element={<ProtectedRoute isSignedIn={isSignedIn}><CreateGoal /></ProtectedRoute>} />
        <Route path= "/home" element={<ProtectedRoute isSignedIn={isSignedIn}><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;