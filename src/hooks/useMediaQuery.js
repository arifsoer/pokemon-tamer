import { useEffect, useState } from "react";

const useMediaQuery = (minWidth) => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesireWidth: false,
  });

  useEffect(() => {
    const resizeHandler = () => {
      const isDesireWidth = window.innerWidth < minWidth;
      setState({
        windowWidth: window.innerWidth,
        isDesireWidth: isDesireWidth,
      });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [minWidth, state.windowWidth]);

  return state.isDesireWidth;
};

export default useMediaQuery;
