import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Staff from "../models/Staff.js";
import Patient from "../models/Users.js";
import Ward from "../models/Ward.js";
import Lab from "../models/Lab.js";
import Pharmacy from "../models/Pharmacy.js";
import Appointment from "../models/Appointment.js";
import Treatment from "../models/Treatment.js";
import Notification from "../models/Notification.js";

dotenv.config();

async function seed() {
  const MONGODB_URI = process.argv[2] || process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI environment variable is not set and no connection string provided as argument"
    );
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB for seeding");

  try {
    const [
      adminCount,
      doctorCount,
      staffCount,
      patientCount,
      wardCount,
      labCount,
      pharmacyCount,
      appointmentCount,
      treatmentCount,
      notificationCount,
    ] = await Promise.all([
      Admin.countDocuments(),
      Doctor.countDocuments(),
      Staff.countDocuments(),
      Patient.countDocuments(),
      Ward.countDocuments(),
      Lab.countDocuments(),
      Pharmacy.countDocuments(),
      Appointment.countDocuments(),
      Treatment.countDocuments(),
      Notification.countDocuments(),
    ]);

    // Admin
    let admin = await Admin.findOne({ email: "admin@example.com" });
    if (!admin) {
      const hashed = await bcrypt.hash("Admin@123", 10);
      admin = await Admin.create({
        firstName: "System",
        lastName: "Admin",
        email: "admin@example.com",
        mobNumber: 1234567890,
        gender: "Male",
        dob: new Date("1990-01-01"),
        password: hashed,
      });
      console.log("✅ Seeded admin user");
    }

    // Patient
    let patient: any = await Patient.findOne({ email: "patient@example.com" });
    if (!patient) {
      const hashed = await bcrypt.hash("Patient@123", 10);
      patient = await Patient.create({
        firstName: "John",
        lastName: "Doe",
        email: "patient@example.com",
        mobNumber: 9876543210,
        gender: "Male",
        NIC: "NIC123456",
        dob: new Date("1985-05-15"),
        password: hashed,
        address: "123 Main Street",
      });
      console.log("✅ Seeded sample patient");
    }

    // Doctor
    let doctor: any = await Doctor.findOne({ email: "doctor@example.com" });
    if (!doctor) {
      const hashed = await bcrypt.hash("Doctor@123", 10);
      doctor = await Doctor.create({
        firstName: "Alice",
        lastName: "Smith",
        email: "doctor@example.com",
        mobNumber: 5551234567,
        gender: "Female",
        NIC: "DOC987654",
        dob: new Date("1980-07-20"),
        specialty: "Cardiology",
        experience: "10 years",
        password: hashed,
        address: "456 Hospital Road",
        role: "doctor",
      });
      console.log("✅ Seeded sample doctor");
    }

    // Staff
    if (!staffCount) {
      const staffPassword = await bcrypt.hash("Staff@123", 10);
      await Staff.create([
        {
          firstName: "Emma",
          lastName: "Nurse",
          email: "nurse@example.com",
          mobNumber: "9990001111",
          gender: "Female",
          NIC: "NUR123456",
          dob: new Date("1992-03-10"),
          role: "Nurse",
          department: "Emergency",
          salary: 45000,
          hireDate: new Date(),
          address: "Nurse Quarters, Block A",
          password: staffPassword,
        },
        {
          firstName: "Liam",
          lastName: "Tech",
          email: "technician@example.com",
          mobNumber: "9990002222",
          gender: "Male",
          NIC: "TEC654321",
          dob: new Date("1991-08-25"),
          role: "Lab Technician",
          department: "Laboratory",
          salary: 40000,
          hireDate: new Date(),
          address: "Tech Housing, Block B",
          password: staffPassword,
        },
      ]);
      console.log("✅ Seeded staff members");
    }

    // Wards
    if (!wardCount) {
      await Ward.create([
        {
          wardName: "General Ward A",
          wardType: "General",
          totalBeds: 30,
          availableBeds: 20,
          floor: 1,
          description: "General ward for stable patients",
          isActive: true,
        },
        {
          wardName: "ICU-1",
          wardType: "ICU",
          totalBeds: 10,
          availableBeds: 2,
          floor: 2,
          description: "Intensive Care Unit",
          isActive: true,
        },
      ]);
      console.log("✅ Seeded wards");
    }

    // Lab Tests
    if (!labCount) {
      await Lab.create([
        {
          testName: "Complete Blood Count",
          description: "Basic blood panel",
          category: "Blood Test",
          price: 500,
          preparationInstructions: "Fasting 8 hours",
          estimatedDuration: "30 minutes",
          isActive: true,
        },
        {
          testName: "Chest X-Ray",
          description: "Radiographic image of chest",
          category: "Radiology",
          price: 1500,
          preparationInstructions: "",
          estimatedDuration: "20 minutes",
          isActive: true,
        },
      ]);
      console.log("✅ Seeded lab tests");
    }

    // Pharmacy
    if (!pharmacyCount) {
      const now = new Date();
      await Pharmacy.create([
        {
          medicineName: "Amoxicillin",
          genericName: "Amoxicillin",
          category: "Antibiotic",
          dosage: "500mg",
          form: "Tablet",
          manufacturer: "HealthPharma",
          price: 50,
          stockQuantity: 200,
          expiryDate: new Date(now.getFullYear() + 1, 0, 1),
          prescriptionRequired: true,
          description: "Broad-spectrum antibiotic",
          isActive: true,
        },
        {
          medicineName: "Paracetamol",
          genericName: "Paracetamol",
          category: "Pain Relief",
          dosage: "500mg",
          form: "Tablet",
          manufacturer: "MediCare",
          price: 20,
          stockQuantity: 500,
          expiryDate: new Date(now.getFullYear() + 2, 0, 1),
          prescriptionRequired: false,
          description: "Analgesic and antipyretic",
          isActive: true,
        },
      ]);
      console.log("✅ Seeded pharmacy medicines");
    }

    // Appointments
    let appointment: any;
    if (!appointmentCount) {
      appointment = await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        mobNumber: "9876543210",
        NIC: "NIC123456",
        dob: patient.dob || new Date("1985-05-15"),
        gender: patient.gender || "Male",
        department: "Cardiology",
        appointmentDate: new Date(),
        appointmentTime: "10:00",
        address: patient.address || "123 Main Street",
        status: "pending",
        notes: "First visit",
      });

      await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        mobNumber: "9876543210",
        NIC: "NIC123456",
        dob: patient.dob || new Date("1985-05-15"),
        gender: patient.gender || "Male",
        department: "Cardiology",
        appointmentDate: new Date(),
        appointmentTime: "11:00",
        address: patient.address || "123 Main Street",
        status: "completed",
        notes: "Follow-up visit",
      });

      await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        mobNumber: "9876543210",
        NIC: "NIC123456",
        dob: patient.dob || new Date("1985-05-15"),
        gender: patient.gender || "Male",
        department: "Cardiology",
        appointmentDate: new Date(),
        appointmentTime: "12:00",
        address: patient.address || "123 Main Street",
        status: "cancelled",
        notes: "Patient cancelled",
      });

      console.log("✅ Seeded appointments");
    } else {
      appointment = await Appointment.findOne();
    }

    // Treatments
    if (!treatmentCount && appointment) {
      const now = new Date();
      await Treatment.create([
        {
          patientId: patient._id,
          doctorId: doctor._id,
          appointmentId: appointment._id,
          treatmentName: "Hypertension Management",
          description: "Treatment plan for high blood pressure",
          diagnosis: "Hypertension",
          medications: ["Amoxicillin", "Paracetamol"],
          procedures: ["Blood pressure monitoring"],
          notes: "Monitor BP daily",
          startDate: now,
          endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
          status: "ongoing",
          followUpDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
        },
      ]);
      console.log("✅ Seeded treatments");
    }

    // Notifications
    if (!notificationCount) {
      await Notification.create([
        {
          recipientId: doctor._id,
          recipientRole: "doctor",
          type: "appointment_reminder",
          message: "You have an appointment with John Doe today at 10:00.",
          isRead: false,
          relatedId: appointment?._id,
        },
        {
          recipientId: admin._id,
          recipientRole: "admin",
          type: "medicine_low_stock",
          message: "Paracetamol stock is below threshold.",
          isRead: false,
        },
        {
          recipientId: patient._id,
          recipientRole: "patient",
          type: "treatment_schedule",
          message: "Your treatment 'Hypertension Management' is scheduled.",
          isRead: false,
        },
      ]);
      console.log("✅ Seeded notifications");
    }

    console.log("🎉 Metadata seeding completed successfully");
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed().catch((error) => {
  console.error("❌ Error while seeding metadata:", error);
  process.exit(1);
});
