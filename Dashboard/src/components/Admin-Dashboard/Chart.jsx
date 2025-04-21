import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  // Sample patient data for the line chart
  const [patientData] = useState({
    chartData: [
      { date: "Mon", count: 12 },
      { date: "Tue", count: 19 },
      { date: "Wed", count: 15 },
      { date: "Thu", count: 24 },
      { date: "Fri", count: 18 },
      { date: "Sat", count: 10 },
      { date: "Sun", count: 8 },
    ],
    totalPatients: 106
  });

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    { name: "Chance Vaccaro", date: "10.01.2003 12:54", status: "Pending" },
    { name: "Desirae Kenter", date: "04.12.2003 03:21", status: "Rejected" },
    { name: "Paityn Lubin", date: "10.01.2003 12:54", status: "Pending" },
    { name: "Phillip Bator", date: "04.12.2003 03:21", status: "Pending" },
    { name: "Emerson Stanton", date: "10.01.2003 12:54", status: "Accept" },
    { name: "Alfredo Rhiel Madsen", date: "03.08.2019 12:54", status: "Rejected" },
  
  ]);

  const [activeRow, setActiveRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [activeTab, setActiveTab] = useState("Appointments");
  const itemsPerPage = 6;

  const handleStatusChange = (index, newStatus) => {
    const updated = [...appointments];
    updated[index].status = newStatus;
    setAppointments(updated);
    setActiveRow(null);
  };

  const handleToggle = (index) => {
    setActiveRow(prev => (prev === index ? null : index));
  };

  // Pagination logic
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const currentItems = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page === "...") return;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push("...", currentPage);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...");
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }
    return [...new Set(pages)]; // Remove duplicates
  };

  return (
    <div className="flex mr-10">
      {/* Left Chart - Patients */}
      <div className="left bg-yellow-100 p-2 ml-6 w-120 h-100 rounded-2xl shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Patients</h2>
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientData.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4F46E5"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="text-sm text-gray-600">
          <p>All time: <strong>{patientData.totalPatients}</strong></p>
          <p>30 days: <strong>42</strong></p>
          <p>7 days: <strong>106</strong></p>
        </div>
      </div>

      {/* Right Section - Appointments */}
      <div className="right w-120">
        <div className="right bg-yellow-200 p-4 ml-4 w-full h-100 rounded-2xl shadow-md">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Appointments</h2>
          </div>

          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '300px' }}>
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, idx) => {
                  const absoluteIndex = (currentPage - 1) * itemsPerPage + idx;
                  return (
                    <tr key={absoluteIndex} className="border-b">
                      <td className="px-4 py-2 font-medium">{item.name}</td>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        {item.status === "Pending" && activeRow === absoluteIndex ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusChange(absoluteIndex, "Accept")}
                              className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full font-semibold hover:bg-green-200"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(absoluteIndex, "Rejected")}
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full font-semibold hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </div>
                        ) : item.status === "Pending" ? (
                          <button
                            onClick={() => handleToggle(absoluteIndex)}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full font-semibold hover:bg-blue-200"
                          >
                            Pending
                          </button>
                        ) : (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item.status === "Rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bottom-10 absolute">
            <div className="flex items-center space-x-2">
              <button 
                className="px-2 py-1 rounded-full text-gray-500 hover:bg-gray-200"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {getPageNumbers().map((p, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded-full ${
                    p === currentPage
                      ? "bg-indigo-100 text-indigo-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(p)}
                  disabled={p === "..."}
                >
                  {p}
                </button>
              ))}
              <button 
                className="px-2 py-1 rounded-full text-gray-500 hover:bg-gray-200"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;