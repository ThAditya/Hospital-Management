import express from "express";
const router = express.Router();

// API Routes

import signupController from "./controllers/signupController.js";
import patientSignupController from "./controllers/patientSignupController.js";

import loginController from "./controllers/loginController.js";

import getCurrentUserController from "./controllers/getCurrentUserController.js";

import userInfoController, { getAllPatients } from "./controllers/userInfoController.js";

import logoutController from "./controllers/logoutController.js";

import editUserController from "./controllers/editUser.js";
import deleteUserController from "./controllers/deleteUser.js";
import { getDoctors } from "./controllers/doctorController.js";

import {
  createAppointment,
  getAllAppointments,
  getPatientAppointments,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  assignDoctorToAppointment,
  deleteAppointment
} from "./controllers/appointmentController.js";

import {
  createTreatment,
  getAllTreatments,
  getPatientTreatments,
  getDoctorTreatments,
  updateTreatment,
  deleteTreatment
} from "./controllers/treatmentController.js";

import notificationController from "./controllers/notificationController.js";
import profileController from "./controllers/profileController.js";
import { getDashboardStats } from "./controllers/adminController.js";

import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} from "./controllers/staffController.js";

// Auth Routes

router.post("/signup", signupController);
// cspell:disable-next-line
router.post("/patientsignup", patientSignupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/getcurusr", getCurrentUserController);
router.post("/getuserinfo", userInfoController);
router.get("/patients", getAllPatients);
router.get("/doctors", getDoctors);
router.patch("/user/edit", editUserController);
router.delete("/user/delete", deleteUserController);

// Appointment Routes

router.post("/appointments", createAppointment);
router.get("/appointments", getAllAppointments);
router.get("/appointments/patient/:patientId", getPatientAppointments);
router.get("/appointments/my", getMyAppointments);
router.get("/appointments/doctor/:doctorId", getDoctorAppointments);
router.get("/doctor-appointments/:doctorId", getDoctorAppointments);
router.patch("/appointments/:id/status", updateAppointmentStatus);
router.patch("/appointments/:id/assign-doctor", assignDoctorToAppointment);
router.delete("/appointments/:id", deleteAppointment);

// Staff Routes

router.post("/staff", createStaff);
router.get("/staff", getAllStaff);
router.get("/staff/:id", getStaffById);
router.patch("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);

// Lab Routes

import {
  createLabTest,
  getAllLabTests,
  getLabTestById,
  updateLabTest,
  deleteLabTest
} from "./controllers/labController.js";

import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} from "./controllers/pharmacyController.js";

router.post("/labs", createLabTest);
router.get("/labs", getAllLabTests);
router.get("/labs/:id", getLabTestById);
router.patch("/labs/:id", updateLabTest);
router.delete("/labs/:id", deleteLabTest);

// Pharmacy Routes

router.post("/pharmacy", createMedicine);
router.get("/pharmacy", getAllMedicines);
router.get("/pharmacy/:id", getMedicineById);
router.patch("/pharmacy/:id", updateMedicine);
router.delete("/pharmacy/:id", deleteMedicine);

// Ward Routes

import {
  createWard,
  getAllWards,
  getWardById,
  updateWard,
  deleteWard
} from "./controllers/wardController.js";

router.post("/wards", createWard);
router.get("/wards", getAllWards);
router.get("/wards/:id", getWardById);
router.patch("/wards/:id", updateWard);
router.delete("/wards/:id", deleteWard);

// Treatment Routes

router.post("/treatments", createTreatment);
router.get("/treatments", getAllTreatments);
router.get("/treatments/patient/:patientId", getPatientTreatments);
router.get("/treatments/doctor/:doctorId", getDoctorTreatments);
router.patch("/treatments/:id", updateTreatment);
router.delete("/treatments/:id", deleteTreatment);

// Notification Routes

router.use("/notifications", notificationController);

// Profile Route
router.get("/user/profile", profileController);

export default router;
