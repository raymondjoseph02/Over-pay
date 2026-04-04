export const exportToCSV = ({
  filename = "data.csv",
  headers,
  rows,
}: {
  filename?: string;
  headers: string[];
  rows: (string | number)[][];
}) => {
  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => {
          // handle commas, quotes, etc.
          const value = String(cell ?? "");
          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
