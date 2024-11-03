import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
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
import CircularProgress from "./CircularProgress";

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
  const { selectedSpace, selectedSchool, selectedColors } = useSchool();
  const [spaceData, setSpaceData] = useState<StudySpaceData | null>(null);
  const today = new Date();
  const currentDay = today.toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [formatData, setFormatData] = useState<FormattedData[]>([]);
  const [logoURL, setLogoURL] = useState("");
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (!selectedSchool) {
      return;
    }
    const getLogo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/schools/${selectedSchool?.name}`
        );
        const data = await response.json();
        setLogoURL(`http://127.0.0.1:8000${data.logo_url}`);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    getLogo();
  }, [selectedSchool]);

  useEffect(() => {
    if (!selectedSchool?.name || !selectedSpace?.name) {
      return;
    }

    const fetchSpaceData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/schools/${selectedSchool?.name}/spaces/${selectedSpace?.name}`
        );
        if (response.status !== 200) {
          return;
        }
        const data = await response.json();
        setSpaceData(data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchSpaceData();
  }, [selectedSchool, selectedSpace]);

  useEffect(() => {
    if (spaceData) {
      const formattedData: FormattedData[] = [];
      const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      spaceData.week_history[selectedDay].forEach((value, index) => {
        formattedData.push({
          hour: hours[index],
          day: selectedDay,
          value: value,
        });
      });
      setFormatData(formattedData);
    }
  }, [spaceData, selectedDay]);

  if (!spaceData) {
    return (
      <div>
        <p>Please Select A Space!</p>
      </div>
    );
  }

  return (
    <div className="md:ml-5 flex flex-col w-full">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-3">
        {logoURL && (
          <Image
            src={logoURL}
            alt="School Logo"
            className="w-[200px] h-[100px] md:w-[300px] md:h-auto"
          />
        )}
        <div>
          <p className="font-semibold">Current {spaceData.name} Usage:</p>
          <CircularProgress
            percentage={
              (spaceData.current_count / spaceData.max_capacity) * 100
            }
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <p className="text-lg font font-semibold">
          Last <span>{currentDay}'s</span> Usage:
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
            <Tooltip />
            <Legend
              formatter={(value) => (
                <span style={{ color: selectedColors?.text }}> {value}</span>
              )}
            />
            <Bar
              dataKey="value"
              fill={selectedColors?.accent}
              name="Percent Used"
            />{" "}
            {/* Bar color */}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-3">
          {week.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: "10px 15px",
                borderRadius: "5px",
                backgroundColor: selectedColors?.accent,
                color: selectedColors?.text,
                border: "none",
                cursor: "pointer",
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceData;
