import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Patient_Sidebar from './Patient_Sidebar';
import Patient from './Patient';
import PatientLab from './PatientLab/PatientLab';
import PatientPharmacy from './PatientPharmacy/PatientPharmacy';
import PatientStaff from './PatientStaff/PatientStaff';
import PatientTreatment from './PatientTreatment/PatientTreatment';

const Dashboard = () => {
  return (
    <div className='flex'>
      <div className="left w-[20%]">
        <Patient_Sidebar/>
        </div>
        <div className="right w-[80%]">
            <Routes>
                <Route path= "" element={<Patient/>}></Route>
                <Route path= "Lab" element={<PatientLab/>}></Route>
                <Route path= "Pharmacy" element={<PatientPharmacy/>}></Route>
                <Route path= "Staff" element={<PatientStaff/>}></Route>
                <Route path= "Treatment" element= {<PatientTreatment/>} ></Route>
            </Routes>
        </div>
    </div>
  )
}

export default Dashboard
