import { createContext, useEffect, useState } from "react";

interface ScreenDimensions {
  width: number;
  height: number;
  readonly xsm: 0;
  readonly sm: 576;
  readonly md: 768;
  readonly lg: 992;
  readonly xlg: 1200;
}

interface Context<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>> | (() => {});
}

const defaultData: ScreenDimensions = {
  width: window.screen.availWidth,
  height: window.screen.availHeight,
  xsm: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xlg: 1200,
};

export const ScreenDimensionContext = createContext<Context<ScreenDimensions>>({
  data: defaultData,
  setData: () => {},
});

function ScreenDimensionContextProvider({ children }: any) {
  const [data, setData] = useState<ScreenDimensions>(defaultData);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setData({
        ...data,
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      });
    });
  }, []);

  return (
    <ScreenDimensionContext.Provider value={{ data, setData }}>
      {children}
    </ScreenDimensionContext.Provider>
  );
}

export default ScreenDimensionContextProvider;
