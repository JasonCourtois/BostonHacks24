import { createContext, ReactNode, useContext, useState } from "react";

interface School {
  name: string;
}

interface SchoolContextType {
  selectedSchool: School | null;
  setSelectedSchool: (school: School) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

interface SchoolProviderProps {
  children: ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  return (
    <SchoolContext.Provider value={{ selectedSchool, setSelectedSchool }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = (): SchoolContextType => {
    const context = useContext(SchoolContext);
    if (!context) {
        throw new Error("useSchool must be used within a SchoolProvider");
    }
    return context
}