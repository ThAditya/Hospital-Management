import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  // Dummy patients data for different ranges
  const data7days = [
    { day: "Mon", patients: 1800 },
    { day: "Tue", patients: 2212 },
    { day: "Wed", patients: 1300 },
    { day: "Thu", patients: 2100 },
    { day: "Fri", patients: 2400 },
    { day: "Sat", patients: 1700 },
    { day: "Sun", patients: 1500 },
  ];

  const data30days = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    patients: Math.floor(Math.random() * 2500) + 500,
  }));

  const dataAllTime = Array.from({ length: 12 }, (_, i) => ({
    day: `Month ${i + 1}`,
    patients: Math.floor(Math.random() * 3000) + 1000,
  }));

  // State for filter
  const [range, setRange] = useState("7");

  const getData = () => {
    if (range === "7") return data7days;
    if (range === "30") return data30days;
    return dataAllTime;
  };

  const totalPatients = getData().reduce((sum, d) => sum + d.patients, 0);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Patients</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              range === "7" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRange("7")}
          >
            7 Days
          </button>
          <button
            className={`px-3 py-1 rounded ${
              range === "30" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRange("30")}
          >
            30 Days
          </button>
          <button
            className={`px-3 py-1 rounded ${
              range === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRange("all")}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="patients" fill="#60A5FA" />
          <Line type="monotone" dataKey="patients" stroke="#2563EB" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>

      {/* Stats below chart */}
      <div className="flex justify-around mt-4 text-sm">
        <div className="text-center">
          <p className="text-gray-500">All Time</p>
          <p className="font-bold">{totalPatients}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">30 Days</p>
          <p className="font-bold">
            {data30days.reduce((sum, d) => sum + d.patients, 0)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">7 Days</p>
          <p className="font-bold">
            {data7days.reduce((sum, d) => sum + d.patients, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
