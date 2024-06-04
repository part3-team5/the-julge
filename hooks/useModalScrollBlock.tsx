import { useEffect } from "react";

const useModalScrollBlock = () => {
  useEffect(() => {
    const $body = document.querySelector("body")!;
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
};

export default useModalScrollBlock;
