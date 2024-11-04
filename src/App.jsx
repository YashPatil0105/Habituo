import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { PlanCreatorPage, ChallengePage, Home, DashboardPage,UserProfilePage,NotificationCenter,ProgressTracker } from "./components/pages";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planCreatorPage" element={<PlanCreatorPage />} />
        <Route path="/dashboardPage" element={<DashboardPage />} />
        <Route path="/challengePage" element={<ChallengePage />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/notificationCenter" element={<NotificationCenter />} />
        <Route path="/progressTracker" element={<ProgressTracker />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
