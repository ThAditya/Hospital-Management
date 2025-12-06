import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import { FaPills, FaRupeeSign, FaBoxOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PatientPharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientTreatments, setPatientTreatments] = useState([]);

  useEffect(() => {
    fetchMedicines();
    fetchPatientTreatments();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("https://hospital-management-1-09zh.onrender.com/pharmacy", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMedicines(response.data);
      setFilteredMedicines(response.data);
    } catch {
      toast.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientTreatments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // Decode token to get patient ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const patientId = decodedToken.id;

      const response = await axios.get(
        `https://hospital-management-1-09zh.onrender.com/treatments/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPatientTreatments(response.data);
    } catch {
      // Silently handle error for treatments
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

  // Get all prescribed medicines from patient's treatments
  const getPrescribedMedicines = () => {
    const prescribedMeds = new Set();
    patientTreatments.forEach(treatment => {
      if (treatment.medications && Array.isArray(treatment.medications)) {
        treatment.medications.forEach(med => prescribedMeds.add(med.toLowerCase()));
      }
    });
    return Array.from(prescribedMeds);
  };

  const prescribedMedicines = getPrescribedMedicines();

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
          <FaPills className="text-indigo-600" />
          Pharmacy Medicines
        </h2>

        {/* Prescribed Medicines Section */}
        {prescribedMedicines.length > 0 && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <FaPills className="text-blue-600" />
              Your Prescribed Medicines
            </h3>
            <div className="flex flex-wrap gap-2">
              {prescribedMedicines.map((med, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {med}
                </span>
              ))}
            </div>
          </div>
        )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => {
              const isPrescribed = prescribedMedicines.includes(medicine.medicineName.toLowerCase()) ||
                                   prescribedMedicines.includes(medicine.genericName?.toLowerCase());

              return (
                <div
                  key={medicine._id}
                  className={`border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
                    isPrescribed ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <FaPills className="text-blue-600" />
                      {medicine.medicineName}
                    </h3>
                    {isPrescribed && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Prescribed
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <strong>Generic:</strong> {medicine.genericName}
                    </p>
                    <p className="text-gray-600">
                      <strong>Category:</strong> {medicine.category}
                    </p>
                    <p className="text-gray-700 flex items-center gap-1">
                      <FaRupeeSign className="text-green-600" />
                      <strong>Price:</strong> ₹{medicine.price}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <FaBoxOpen className="text-gray-500" />
                      <strong>Stock:</strong> {medicine.stockQuantity}
                    </p>
                    <p className="flex items-center gap-1">
                      {medicine.isActive ? (
                        <>
                          <FaCheckCircle className="text-green-600" />
                          <span className="text-green-600 font-medium">Active</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-500" />
                          <span className="text-red-500 font-medium">Inactive</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No medicines found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientPharmacy;
