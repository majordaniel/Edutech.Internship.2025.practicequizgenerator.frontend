import { useState, useEffect } from "react";

export function useFullHeight(ref) {
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    if (ref.current) {
      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
      setHeight(window.innerHeight - navbarHeight);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [ref]);

  return height;
}
