import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Feed from "./pages/Feed";
import { useSelector } from "react-redux";
import { RootState } from "./utils/appStore";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const isUserPresent = user._id.length > 0;
  console.log(user._id.length > 0);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={isUserPresent ? <Feed /> : <Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
