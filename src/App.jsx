import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import MockScreen from "./pages/MockScreen";
import CreateQuiz from "./pages/CreateQuiz";
import Layout from "./components/layout/Layouts";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      {/* Default route → go to login if not logged in */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes (inside Layout) */}
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
      </Route>

      {/* Catch-all fallback */}
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
//           {showUpload && (
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Exam File
//               </label>
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
//               />
//               {fileName && (
//                 <p className="mt-2 text-sm text-gray-600">
//                   Selected File: {fileName}
//                 </p>
//               )}
//             </div>
//           )}
//         </form>

//         {/* Submit Button */}
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//           >
//             Create Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
//         </form>
//       </div>
//     </div>
//   );
// }
//           </div>

//           <div>   