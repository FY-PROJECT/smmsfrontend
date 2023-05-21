import { Routes, Route } from "react-router-dom";
// import "./App.css";
import "./css/style.css";
// Components
import Login from "./components/Auth/Login";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile";
import Landing from "./components/Landing/Landing";
import About from "./components/About";
// Contexts
import AlertState from "./contexts/Alert/AlertState";
import TrainerState from "./contexts/TrainerState";  
import QueryState from "./contexts/QueryState";
import Trainer from "./components/Admin/Trainer";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <AlertState>
        <TrainerState>
          <QueryState>
            <Routes>      
              <Route path="/" element={<><Landing /></>} />
              <Route path="/profile/:bsgid/:dob" element={<><Profile /></>} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/add" element={<><Alert/><Trainer /></>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </QueryState>
        </TrainerState>
    </AlertState>
    </>
  );
}

export default App;
