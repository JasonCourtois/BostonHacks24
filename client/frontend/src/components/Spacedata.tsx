import { useEffect, useState } from "react";
import { useSchool } from "../hooks/SchoolContextProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StudySpaceData {
  name: string;
  current_count: number;
  max_capacity: number;
  week_history: {
    [day: string]: number[]; // Days of the week with an array of counts
  };
  amenities: {
    name: string; // Each amenity has a name
  }[];
}

interface FormattedData {
  hour: string;
  day: string;
  value: number;
}

const SpaceData: React.FC = () => {
  const { selectedSpace, selectedSchool } = useSchool();
  const [spaceData, setSpaceData] = useState<StudySpaceData | null>(null);
  const today = new Date();
  const currentDay = today.toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [formatData, setFormatData] = useState<FormattedData[]>([]); // Updated state initialization

  useEffect(() => {
    if (!selectedSchool?.name || !selectedSpace?.name) {
      return;
    }

    const fetchSpaceData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/schools/${selectedSchool?.name}/spaces/${selectedSpace?.name}`
        );
        const data = await response.json();
        setSpaceData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchSpaceData();
  }, [selectedSchool, selectedSpace]);

  useEffect(() => {
    if (spaceData) {
      const formattedData: FormattedData[] = []; // Define the type here
      const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      for (let day in spaceData.week_history) {
        spaceData.week_history[day].forEach((value, index) => {
          formattedData.push({
            hour: hours[index],
            day: day,
            value: value,
          });
        });
      }
      setFormatData(formattedData);
    }
  }, [spaceData]); // Trigger only when spaceData changes

  if (!spaceData) {
    return (
      <div>
        <p>Please Select A Space!</p>
      </div>
    );
  } else {
    console.log(spaceData);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-10">
        <p>{spaceData.name}</p>
        <p>{(spaceData.current_count / spaceData.max_capacity) * 100}</p>
      </div>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={formatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpaceData;
