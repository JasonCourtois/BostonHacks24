import { useEffect, useState } from "react";
import { useSchool } from "../hooks/SchoolContextProvider";

const SpaceData: React.FC = () => {
  const { selectedSpace, selectedSchool } = useSchool();
  const [spaceData, setSpaceData] = useState(null);

  useEffect(() => {
    if (!selectedSchool?.name || !selectedSpace?.name) {
      return;
    }

    const fetchSpaceData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/schools/${selectedSchool?.name}/spaces/${selectedSpace?.name}`);
        const data = await response.json();
        setSpaceData(data)
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchSpaceData();
  }, [selectedSchool, selectedSpace]);

  return (
    <div>
      <p>This is data on space</p>
    </div>
  );
};

export default SpaceData;
