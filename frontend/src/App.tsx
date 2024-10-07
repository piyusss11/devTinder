import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./pages/Body";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (<>
    {/* <div className="h-screen bg-gradient-to-t from-[#2c2b30]  to-[#4f4f51]"> */}
      {/* <div className="h-screen bg-[#2c2b30]">  */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
     {/* </div> */}
  </>
  );
}

export default App;
