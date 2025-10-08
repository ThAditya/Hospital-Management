import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const samplePatientData = [
  { gender: 'Male', count: 60 },
  { gender: 'Female', count: 40 },
];

const sampleAgeData = [
  { ageGroup: '0-18', count: 15 },
  { ageGroup: '19-35', count: 40 },
  { ageGroup: '36-60', count: 30 },
  { ageGroup: '60+', count: 15 },
];

const COLORS = ['#0088FE', '#FF8042'];

const PatientDataGraph = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Patient Data Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={samplePatientData}
                dataKey="count"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {samplePatientData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Age Group Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleAgeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PatientDataGraph;
