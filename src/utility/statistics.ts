import type { DonutData } from "../types/type";

interface StatEntry {
  name: string;
  value: string;
}

export const getStatChartColor = (name: string, theme: string): string => {
  switch (name.toLowerCase()) {
    case "shopping":
      return theme === "light" ? "#1A202C" : "#ffffff";
    case "home":
      return "#194BFB";
    case "others":
      return theme !== "light" ? "#2A313C" : "#EDF2F7";
    default:
      return "#cccccc";
  }
};

export const toStatChartData = (
  statistics: StatEntry[],
  theme: string,
): DonutData[] =>
  statistics.map((stat) => ({
    label: stat.name,
    value: parseFloat(stat.value.replace(/,/g, "")),
    color: getStatChartColor(stat.name, theme),
  }));
