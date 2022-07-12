import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./register/Register";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./logout/Logout";
import Personalbudgetform from "./pages/PersonalBudgetIncome";
import ActivateAccount from "./pages/ActivateAccount"
import PrivateRoutes from "./Hoc/PrivateRoutes";
import ProtectedRoutes from "./Hoc/protectedRoutes";
import Error404 from "./errorPage/Error404";
import ResetPassword from "./resetPassword/ResetPassword";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import Number from "./pages/Number";
import Goals from "./pages/Goals";
import Summary from "./components/BadgetForm/Summary";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Signup"
          element={
            <ProtectedRoutes>
              <Signup />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/account/activate/:token"
          element={
            <ProtectedRoutes>
              <ActivateAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <ProtectedRoutes>
              <ForgotPassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/forgot/resetPassword/:token"
          element={
            <ProtectedRoutes>
              <ResetPassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Personal_budget_income"
          isAuth={true}
          element={
            <PrivateRoutes>
              <Personalbudgetform />
            </PrivateRoutes>
          }
        />
        <Route
          path="/dashboard"
          isAuth={true}
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/number/:id"
          isAuth={true}
          element={
            <PrivateRoutes>
              <Number />
            </PrivateRoutes>
          }
        />

        <Route
          path="/Goals"
          exact
          element={
            <PrivateRoutes>
              <Goals />
            </PrivateRoutes>
          }
        />
        <Route
          path="/summary"
          isAuth={true}
          element={
            <PrivateRoutes>
              <Summary />
            </PrivateRoutes>
          }
        />

        <Route
          path="/logout"
          isAuth={true}
          element={
            <PrivateRoutes>
              <Logout />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
