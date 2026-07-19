import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OnboardingRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Wait for profile to load
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  // User already completed onboarding
  if (userProfile.profileCompleted) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default OnboardingRoute;