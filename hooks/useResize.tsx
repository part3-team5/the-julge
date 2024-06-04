import { useState, useEffect } from "react";

const useResize = (point: number) => {
  const [isPoint, setIsPoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPoint(window.innerWidth <= point);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [point]);

  return isPoint;
};

export default useResize;
