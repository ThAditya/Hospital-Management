import React from "react";
import { Routes, Route } from "react-router-dom";
import Doctor_Sidebar from "./Doctor_Sidebar";
import DoctorStaff from "./DoctorStaff";
import DoctorLab from "./DoctorLab/DoctorLab";
import DoctorPharmacy from "./DoctorPharmacy/DoctorPharmacy";
import DoctorTreatment from "./DoctorTreatment/DoctorTreatment";
import DoctorWard from "./DoctorWard/DoctorWard";
import DoctorPatient from "./DoctorPatients/DoctorPatient";
import DoctorAssistants from "./DoctorAssistants/DoctorAssistants";
import DocDashboard from "./DocDashboard";

const DoctorDashboard = () => {
  return (
    <div className="flex h-screen">
      <Doctor_Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={<DocDashboard />}
          />
          <Route path="/staff" element={<DoctorStaff />} />
          <Route path="/patient" element={<DoctorPatient />} />
          <Route path="/treatment" element={<DoctorTreatment />} />
          <Route path="/lab" element={<DoctorLab />} />
          <Route path="/pharmacy" element={<DoctorPharmacy />} />
          <Route path="/ward" element={<DoctorWard />} />
          <Route path="/assistants" element={<DoctorAssistants />} />
        </Routes>
                <div className='h-15'></div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
