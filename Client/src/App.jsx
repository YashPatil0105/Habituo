import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { PlanCreatorPage, ChallengePage, Home, DashboardPage, UserProfilePage, NotificationCenter, ProgressTracker } from "./components/pages";
import { Footer } from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="planCreatorPage" element={<PlanCreatorPage />} />
            <Route path="dashboardPage" element={<DashboardPage />} />
            <Route path="challengePage" element={<ChallengePage />} />
            <Route path="userProfile" element={<UserProfilePage />} />
            <Route path="notificationCenter" element={<NotificationCenter />} />
            <Route path="progressTracker" element={<ProgressTracker />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
