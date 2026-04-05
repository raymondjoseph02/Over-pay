export const getStatChartColor = (name: string, theme: string): string => {
  switch (name.toLowerCase()) {
    case "shopping":
      return theme === "light" ? "#1A202C" : "#ffffff";
    case "home":
      return "#194BFB";
    case "others":
      return theme !== "light" ? "#2A313C" : "#EDF2F7";
    case "food":
      return "#ffc837";
    case "transport":
      return "#936dff";
    case "health":
      return "#22c55e";
    case "entertainment":
      return "#ff4747";
    case "transfer":
      return "#5d6a83";
    case "withdraw":
      return "#ff784b";
    default:
      return "#cbd5e0";
  }
};
