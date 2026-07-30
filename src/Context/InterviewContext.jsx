import { createContext, useContext } from "react";

export const InterviewContext = createContext();

export const useInterview = () => useContext(InterviewContext);