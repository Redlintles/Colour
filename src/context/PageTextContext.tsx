import { createContext, useState } from "react";

import React from "react";

import { dataPT, Data } from "data/PageText";

interface PageTextContext {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

export const PageTextContext = createContext<PageTextContext>({
  data: dataPT,
  setData: () => {},
});

function PageTextContextProvider({ children }: any) {
  const [data, setData] = useState<Data>(dataPT);
  return (
    <PageTextContext.Provider value={{ data, setData }}>
      {children}
    </PageTextContext.Provider>
  );
}

export default PageTextContextProvider;
