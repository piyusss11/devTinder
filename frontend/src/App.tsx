import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./pages/Body";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (<>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
