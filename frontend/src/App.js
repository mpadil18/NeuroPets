import "./App.css";
import Login from "./Login/Login"
import RegPage from "./Registration/RegPage";
import CreateGoal from "./CreateGoal/CreateGoal";
import Home from "./Home/Home"
import PetGallery from "./PetGallery/PetGallery"
import DocIntro from "./DoctorIntro/DocIntro";
import ViewProgress from "./ViewProgress/ViewProgress";
import GoalCompleted from "./GoalCompleted/GoalCompleted";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // import the ProtectedRoute component
import { useState } from 'react';

//add additional paths to different pages using same syntax <Route path = "..." element = {<.../>} />
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
      <Routes>

        <Route path = "" element = {<Login setIsSignedIn={setIsSignedIn} />} /> 
        <Route path = "/" element = {<Login setIsSignedIn={setIsSignedIn} />} />
        <Route path = "/regPage" element = {<RegPage setIsSignedIn={setIsSignedIn} />} />
        <Route path = "/createGoal" element={<ProtectedRoute isSignedIn={isSignedIn}><CreateGoal /></ProtectedRoute>} />
        <Route path = "/home" element={<ProtectedRoute isSignedIn={isSignedIn}><Home /></ProtectedRoute>} />
        <Route path = "/doctorIntro" element={<ProtectedRoute isSignedIn={isSignedIn}><DocIntro /></ProtectedRoute>} />

        <Route path= "/petGallery" element={<ProtectedRoute isSignedIn={isSignedIn}><PetGallery /></ProtectedRoute>} />
        <Route path= "/viewProgress" element={<ProtectedRoute isSignedIn={isSignedIn}><ViewProgress /></ProtectedRoute>} />
        <Route path = "/goalCompleted" element={<ProtectedRoute isSignedIn={isSignedIn}><GoalCompleted /></ProtectedRoute>} />
      </Routes>

  );
}

export default App;