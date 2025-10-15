import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import MockScreen from "./pages/MockScreen";
import AllQuizzes from "./pages/AllQuizzes"; // adjust path as needed
import CreateQuiz from "./pages/CreateQuiz";
// import FormScreen from "./pages/quizscreen/FormScreen";
import QuizScreen from "./pages/quizscreen/QuizScreen";       
import ResultPage from "./pages/quizscreen/ResultPage";       
import Analytics from "./pages/Analytics"; 
import AnalyticsDetail from "./pages/AnalyticsDetail";
import Layout from "./components/layout/Layouts";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mock" element={<MockScreen />} />
        <Route path="/all-quizzes" element={<AllQuizzes />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        {/* <Route path="/form" element={<FormScreen />} /> */}
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/quiz/result" element={<ResultPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics-details" element={<AnalyticsDetail />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
