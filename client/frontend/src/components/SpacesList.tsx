import { useSchool } from "../hooks/SchoolContextProvider";
import { useEffect, useState } from "react";

const SpacesList: React.FC = () => {
  const [spaces, setSpaces] = useState<string[] | undefined>(undefined);
  const { selectedSchool, setSelectedSpace, selectedColors } = useSchool();

  useEffect(() => {
    if (!selectedSchool?.name) {
      return;
    }
    const fetchSchools = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/schools/${selectedSchool.name}/spaces`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, [selectedSchool]);

  return (
    <div style={{ backgroundColor: selectedColors?.accent, color: selectedColors?.text }}>
      <p>Select a Space!</p>
      {spaces && spaces.map((space, index) => (
        <p key={index} onClick={() => setSelectedSpace({name: space})}>{space}</p>
      ))}
    </div>
  );
};

export default SpacesList;
