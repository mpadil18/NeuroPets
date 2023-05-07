import "./App.css";
import Login from "./Login/Login"
import RegPage from "./Registration/RegPage";
import CreateGoal from "./CreateGoal/CreateGoal";
import Home from "./Home/Home"
import CompleteGoal from "./CompleteGoal/CompleteGoal";
import { BrowserRouter , Routes, Route } from 'react-router-dom';



//add additional paths to different pages using same syntax <Route path = "..." element = {<.../>} />
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "" element = {<Login/>} /> 
        <Route path = "/" element = {<Login/>} />
        <Route path = "/regPage" element = {<RegPage/>} />
        <Route path = "/createGoal" element = {<CreateGoal />} />
        <Route path = "/home" element = {<Home />} />
        <Route path = "/completeGoal" element = {<CompleteGoal />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;