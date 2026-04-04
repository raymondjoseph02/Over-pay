import { useEffect, useState } from "react";
import type { DonutChartProps } from "../../types/type";

export const StatisticsChart = ({
  data,
  size = 140,
  strokeWidth = 14,
}: DonutChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((item, index) => {
          const percent = item.value / total;
          const dash = percent * circumference;
          const offset =
            (data.slice(0, index).reduce((acc, curr) => acc + curr.value, 0) /
              total) *
            circumference;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={
                animated
                  ? `${dash} ${circumference - dash}`
                  : `0 ${circumference}`
              }
              strokeDashoffset={-offset}
              style={{
                transition: `stroke-dasharray 0.8s ease ${index * 0.2}s`,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
};
