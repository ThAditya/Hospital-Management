import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const PatientPharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4200/pharmacy");
      setMedicines(response.data);
      setFilteredMedicines(response.data);
    } catch {
      toast.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  // Filter medicines by search term
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = medicines.filter((m) =>
      m.medicineName.toLowerCase().includes(value)
    );
    setFilteredMedicines(filtered);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          💊 Pharmacy Medicines
        </h2>

        {/* Search Bar */}
        <div className="flex items-center mb-6 bg-gray-100 rounded-xl p-2 shadow-sm">
          <Search className="text-gray-500 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search medicine by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-700"
          />
        </div>

        {loading ? (
          <p className="text-center text-indigo-600 font-medium animate-pulse">
            Loading medicines...
          </p>
        ) : filteredMedicines.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Medicine Name</th>
                  <th className="p-3 text-left">Generic Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((medicine) => (
                  <tr
                    key={medicine._id}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="border-t p-3 font-semibold text-gray-700">
                      {medicine.medicineName}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {medicine.genericName}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {medicine.category}
                    </td>
                    <td className="border-t p-3 text-gray-700">
                      ₹{medicine.price}
                    </td>
                    <td className="border-t p-3 text-gray-600">
                      {medicine.stockQuantity}
                    </td>
                    <td
                      className={`border-t p-3 font-medium ${
                        medicine.isActive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {medicine.isActive ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No medicines found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientPharmacy;
