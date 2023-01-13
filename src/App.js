// react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// register components
import SignUp from "./register/SignUp";
import Login from "./register/Login";

// components
import FirstComponent from "./components/FirstComponent";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Task from "./pages/Task/Task";
import Statistics from "./pages/Statistics/Statistics";
import NotFoundPage from "./components/NotFoundPage";

// toast
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="bg-light py-4 content">
        <FirstComponent />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer autoClose={2000} position="top-center" />
    </Router>
  );
}

export default App;
