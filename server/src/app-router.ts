import express from "express";
const router = express.Router();

import signupController from "./controllers/signupController";
import patientSignupController from "./controllers/patientSignupController";

import loginController from "./controllers/loginController";

import getCurrentUserController from "./controllers/getCurrentUserController";

import userInfoController, { getAllPatients } from "./controllers/userInfoController";

import logoutController from "./controllers/logoutController";

import editUserController from "./controllers/editUser";
import deleteUserController from "./controllers/deleteUser";
import { getDoctors } from "./controllers/doctorController";

import {
  createAppointment,
  getAllAppointments,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  assignDoctorToAppointment,
  deleteAppointment
} from "./controllers/appointmentController";

import {
  createTreatment,
  getAllTreatments,
  getPatientTreatments,
  getDoctorTreatments,
  updateTreatment,
  deleteTreatment
} from "./controllers/treatmentController";

import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} from "./controllers/staffController";

// Auth Routes

router.post("/signup", signupController);
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
router.get("/appointments/doctor/:doctorId", getDoctorAppointments);
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
} from "./controllers/labController";

import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} from "./controllers/pharmacyController";

router.post("/lab", createLabTest);
router.get("/lab", getAllLabTests);
router.get("/lab/:id", getLabTestById);
router.patch("/lab/:id", updateLabTest);
router.delete("/lab/:id", deleteLabTest);

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
} from "./controllers/wardController";

router.post("/ward", createWard);
router.get("/ward", getAllWards);
router.get("/ward/:id", getWardById);
router.patch("/ward/:id", updateWard);
router.delete("/ward/:id", deleteWard);

// Treatment Routes

router.post("/treatments", createTreatment);
router.get("/treatments", getAllTreatments);
router.get("/treatments/patient/:patientId", getPatientTreatments);
router.get("/treatments/doctor/:doctorId", getDoctorTreatments);
router.patch("/treatments/:id", updateTreatment);
router.delete("/treatments/:id", deleteTreatment);

export default router;
