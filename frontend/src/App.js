import "./App.css";
import Login from "./Login/Login"
import RegPage from "./Registration/RegPage";
import CreateGoal from "./CreateGoal/CreateGoal";
import Home from "./Home/Home"
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // import the ProtectedRoute component



//add additional paths to different pages using same syntax <Route path = "..." element = {<.../>} />
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "" element = {<Login/>} /> 
        <Route path = "/" element = {<Login/>} />
        <Route path = "/regPage" element = {<RegPage/>} />
        <ProtectedRoute path="/createGoal" element={<CreateGoal />} /> // wrap with ProtectedRoute
        <ProtectedRoute path="/home" element={<Home />} /> // wrap with ProtectedRoute
      </Routes>
    </BrowserRouter>

  );
}

export default App;