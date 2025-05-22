import React, { createContext, useContext, useState, ReactNode } from 'react';

type InterviewData = {
  session_id: string;
  cv: string;
  job_description: string;
};

type InterviewContextType = {
  data: InterviewData | null;
  setData: (data: InterviewData) => void;
};

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<InterviewData | null>(null);

  return (
    <InterviewContext.Provider value={{ data, setData }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('useInterview must be used within InterviewProvider');
  return context;
};
