import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface CircularProgressProps {
  percentage: number; // Value from 0 to 100
  size?: number; // Size of the circular chart
  strokeWidth?: number; // Thickness of the progress stroke
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
}) => {
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  return (
    <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          innerRadius={size / 2 - strokeWidth}
          outerRadius={size / 2}
          paddingAngle={5}
        >
          <Cell fill="#4f46e5" /> {/* Primary progress color */}
          <Cell fill="#d1d5db" /> {/* Background color */}
        </Pie>
      </PieChart>
      {/* Centered Percentage Text */}
      <div className="absolute inset-0 flex justify-center items-center text-lg font-semibold text-gray-800">
        {`${Math.round(percentage)}%`}
      </div>
    </div>
  );
};

export default CircularProgress;
