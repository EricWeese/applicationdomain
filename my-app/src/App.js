import Signup from './pages/signup/Signup.js'
import Login from './pages/login/Login.js'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
//import { AuthContext } from "./contexts/AuthContext";
function App() {
  //const { currentUser } = useContext(AuthContext)

  //const RequireAuth = ({ children }) => {
  // return currentUser ? children : <Navigate to="/login" />;
  //};
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}>
          <Route path="/Login" element={<Login />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
//<Route index element={<RequireAuth><Home /></RequireAuth>} />s
export default App;
