import React from 'react';

const Ward = () => {
  // Data for the wards table
  const wardsData = [
    {
      id: '1',
      name: 'Base line',
      nurses: '15',
      charge: '15000.00',
      doctors: '3',
      patients: '18',
    },
    {
      id: '2',
      name: 'Prove line',
      nurses: '10',
      charge: '10000.00',
      doctors: '2',
      patients: '10',
    },
    {
      id: '3',
      name: 'Atlas',
      nurses: '15',
      charge: '18000.00',
      doctors: '4',
      patients: '15',
    },
    {
      id: '4',
      name: 'Base line',
      nurses: '15',
      charge: '15000.00',
      doctors: '3',
      patients: '18',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-green-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-green-800 mb-8">Ward Management</h1>
      
      {/* Generate Report Section */}
      <div className="bg-green-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Generate Report</h2>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
            <span className="ml-2 text-green-800">Ward Name</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
            <span className="ml-2 text-green-800">Number of nurses</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
            <span className="ml-2 text-green-800">Number of assign doctors</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
            <span className="ml-2 text-green-800">Number of patients</span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-teal-200 my-6"></div>

      {/* Total Ward Charge Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-4">RS: Total Ward charge</h3>
        <div className="flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
            Add
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
            Update
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
            Delete
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-teal-200 my-6"></div>

      {/* Recent Wards Section */}
      <div className="bg-green-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-700 mb-2">Recent Wards</h3>
        <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-teal-200 text-teal-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ward ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ward name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of nurses</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Ward charge</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of assign doctors</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wardsData.map((ward) => (
                <tr key={ward.id} className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ward.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ward.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ward.nurses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ward.charge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ward.doctors}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ward.patients}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <span className="cursor-pointer hover:text-blue-700 mr-3">✓</span>
                    <span className="cursor-pointer hover:text-blue-700">☐</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ward;