import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const PatientLab = () => {
  const [labTests, setLabTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("https://hospital-management-1-09zh.onrender.com/labs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLabTests(response.data);
      setFilteredTests(response.data);
    } catch {
      toast.error("Failed to fetch lab tests");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = labTests.filter((test) =>
      test.testName.toLowerCase().includes(value)
    );
    setFilteredTests(filtered);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          🧪 Available Lab Tests
        </h2>

        {/* Search Bar */}
        <div className="flex items-center mb-6 bg-gray-100 rounded-xl p-2 shadow-sm">
          <Search className="text-gray-500 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search test by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-700"
          />
        </div>

        {loading ? (
          <p className="text-center text-indigo-600 font-medium animate-pulse">
            Loading lab tests...
          </p>
        ) : filteredTests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Test Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test) => (
                  <tr
                    key={test._id}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="border-t p-3 font-semibold text-gray-700">
                      {test.testName}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {test.category}
                    </td>
                    <td className="border-t p-3 text-gray-700">₹{test.price}</td>
                    <td className="border-t p-3 text-gray-600">
                      {test.estimatedDuration}
                    </td>
                    <td
                      className={`border-t p-3 font-medium ${
                        test.isActive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {test.isActive ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No lab tests found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientLab;
