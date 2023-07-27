import { createContext, useState } from "react";
import { Tab } from "../Types/GradgenBuilderTypes";
import { v4 as uuidV4 } from "uuid";

interface activeTabContextInt {
  activeTab: Tab;
  setActiveTab: Function;
}

export const defaultValue: Tab = {
  name: "Novo",
  id: uuidV4(),
  type: "linear",
  colors: [],
};

export const activeTabContext = createContext<activeTabContextInt>({
  activeTab: defaultValue,
  setActiveTab: () => {},
});

export function ActiveTabContextProvider({ children }: any) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultValue);
  return (
    <activeTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </activeTabContext.Provider>
  );
}
