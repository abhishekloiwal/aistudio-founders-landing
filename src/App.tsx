import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "@/polymet/layouts/landing-layout";
import LandingPage from "@/polymet/pages/landing-page";
import AboutPage from "@/polymet/pages/about-page";
import TeamPage from "@/polymet/pages/team-page";
import VibesPage from "@/polymet/pages/vibes-page";
import ApplyPage from "@/polymet/pages/apply-page";

export default function AIStudioPrototype() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingLayout>
              <LandingPage />
            </LandingLayout>
          }
        />
        <Route
          path="/about"
          element={
            <LandingLayout>
              <AboutPage />
            </LandingLayout>
          }
        />
        <Route
          path="/vibes"
          element={
            <LandingLayout>
              <VibesPage />
            </LandingLayout>
          }
        />
        <Route
          path="/team"
          element={
            <LandingLayout>
              <TeamPage />
            </LandingLayout>
          }
        />
        <Route
          path="/apply"
          element={
            <LandingLayout>
              <ApplyPage />
            </LandingLayout>
          }
        />
      </Routes>
    </Router>
  );
}
