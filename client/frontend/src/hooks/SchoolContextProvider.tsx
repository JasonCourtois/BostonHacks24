import { createContext, ReactNode, useContext, useState } from "react";

interface School {
  name: string;
}

interface Space {
  name: string,
}

interface Colors {
  accent: string,
  text: string,
}

interface SchoolContextType {
  selectedSchool: School | null;
  selectedSpace: Space | null;
  selectedColors: Colors | null;
  setSelectedSchool: (school: School) => void;
  setSelectedSpace: (space: Space) => void;
  setSelectedColors: (colors: Colors) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

interface SchoolProviderProps {
  children: ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [selectedColors, setSelectedColors] = useState<Colors | null>(null);

  return (
    <SchoolContext.Provider value={{ selectedSchool, setSelectedSchool, selectedSpace, setSelectedSpace, selectedColors, setSelectedColors}}>
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