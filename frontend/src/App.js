import "./App.css";
import Login from "./Login/Login"
import RegPage from "./Registration/regPage";
import { BrowserRouter , Routes, Route } from 'react-router-dom';

//add additional paths to different pages using same syntax <Route path = "..." element = {<.../>} />
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path = "" element = {<Login/>} /> 
        <Route path = "/" element = {<Login/>} />
        <Route path = "/regPage" element = {<RegPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;