import React from "react";
import { useState } from "react";

interface ContextProps {
  children: React.ReactNode;
}

export interface IssueData {
  number: number;
  title: string;
  created_at: string;
  user?: string;
  comments: number;
}

interface IssueContext {
  issues: IssueData[];
  setIssues: React.Dispatch<React.SetStateAction<IssueData[]>>;
}

export const IssueContext = React.createContext<IssueContext>(null!);

const ContextProvider = ({ children }: ContextProps) => {
  const [issues, setIssues] = useState<IssueData[]>([]);

  const value = {
    issues,
    setIssues
  };

  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
};

export default ContextProvider;
