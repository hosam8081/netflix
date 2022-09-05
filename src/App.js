import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import Account from './pages/Account'
import MovieDetails from "./pages/MovieDetails";
function App() {
  return (
    <>
      <Router basename="/netflix">
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
