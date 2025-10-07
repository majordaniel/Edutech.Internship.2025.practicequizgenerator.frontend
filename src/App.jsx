import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import MockScreen from "./pages/MockScreen";
import CreateQuiz from "./pages/CreateQuiz";
// import FormScreen from "./pages/quizscreen/FormScreen";
import QuizScreen from "./pages/quizscreen/QuizScreen";       // updated path
import ResultPage from "./pages/quizscreen/ResultPage";       // added
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
        <Route path="/create-quiz" element={<CreateQuiz />} />
        {/* <Route path="/form" element={<FormScreen />} /> */}
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/quiz/result" element={<ResultPage />} />   {/* new */}
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
