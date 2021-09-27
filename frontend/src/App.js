import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./pages/Auth/Login";
import TutorLogin from "./pages/Auth/TutorLogin";
import TutorSignup from "./pages/Auth/TutorSignup";
import Signup from "./pages/Auth/Signup";
import Homepage from "./pages/HomePage/Homepage";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import Logout from "./pages/Auth/Logout";
import MainPage from "./pages/MainPage/MainPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MainSearch from "./pages/SearchPage/MainSearch";
import TutorSignupCon from "./pages/Auth/TutorSignupCon";
import TutorSignupUpdate from "./pages/Auth/TutorSignupUpdate";
import TutorDashboard from "./pages/Dashboard/TutorDashboard";
import { createContext } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import TutorProfile from "./pages/profile/TutorProfile";
import TutorUpdate from "./pages/Dashboard/TutorUpdate";
import AdminLogin from "./pages/Admin/Login";
import Admin from "./pages/Admin/Admin";
import Policy from "./pages/Normal/Policy";
import AboutUs from "./pages/Normal/About";
import Contact from "./pages/Normal/Contact";
import StudentPass from "./pages/RestPass/StudentPass";
import TutorPass from "./pages/RestPass/TutorPass";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/home" exact>
            <MainPage />
          </Route>
          <Route path="/students/login" exact>
            <Login />
          </Route>
          <Route path="/tutor/login" exact>
            <TutorLogin />
          </Route>
          <Route path="/students/signup" exact>
            <Signup />
          </Route>
          <Route path="/tutor/signup" exact>
            <TutorSignup />
          </Route>
          <Route path="/tutor/signup/imageUpload" exact>
            <TutorSignupCon />
          </Route>
          <Route path="/tutor/signup/updateInfo" exact>
            <TutorSignupUpdate />
          </Route>
          <Route path="/user/logout" exact>
            <Logout />
          </Route>
          <Route path="/student/dashboard">
            <StudentDashboard />
          </Route>
          <Route path="/tutor/dashboard/">
            <TutorDashboard />
          </Route>

          <Route path="/search" exact>
            <SearchPage />
          </Route>
          <Route path="/searchpage/" exact>
            <MainSearch />
          </Route>
          <Route path="/tutor/" exact>
            <TutorProfile />
          </Route>

          {/* admin part */}
          <Route path="/admin/login" exact>
            <AdminLogin />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/privacy">
            <Policy />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route>
          {/* <Route path="/contact">
            <Contact />
          </Route> */}

          <Route path="/student/reset/pass">
            <StudentPass />
          </Route>
          <Route path="/tutor/reset/pass">
            <TutorPass />
          </Route>

          <Route path="/tutor/verify/email">
            <VerifyEmail />
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
