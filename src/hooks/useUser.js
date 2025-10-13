
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to get from "userData" first (what login sets)
    const storedUserData = localStorage.getItem("userData");
    
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        // Ensure userId field exists (normalize from different possible fields)
        const normalizedUser = {
          ...parsedUser,
          userId: parsedUser.userId || parsedUser.id,
          id: parsedUser.id || parsedUser.userId,
        };
        setUser(normalizedUser);
        return;
      } catch (err) {
        console.error("Failed to parse userData from localStorage:", err);
      }
    }
    
    // Fallback to "user" key if "userData" doesn't exist
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const normalizedUser = {
          ...parsedUser,
          userId: parsedUser.userId || parsedUser.id,
          id: parsedUser.id || parsedUser.userId,
        };
        setUser(normalizedUser);
        return;
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
    
    // If no stored data, build user object from individual localStorage items
    if (!storedUserData && !storedUser) {
      const email = localStorage.getItem("loggedInUserEmail");
      const name = localStorage.getItem("loggedInUserName");
      const studentId = localStorage.getItem("loggedInUserStudentId");
      const userId = localStorage.getItem("loggedInUserId");
      
      if (email || name || userId) {
        setUser({
          id: userId,
          userId: userId,
          name: name || "Student",
          email: email,
          studentId: studentId,
          role: "Student"
        });
      }
    }
  }, []);

  return { user };
}