   # TODO: Complete Frontend UI/UX and Backend Functionality

## Backend Implementation
- [x] Create Staff model (server/src/models/Staff.ts)
- [x] Create Lab model (server/src/models/Lab.ts)
- [x] Create Pharmacy model (server/src/models/Pharmacy.ts)
- [x] Create Ward model (server/src/models/Ward.ts)
- [x] Create staffController.ts with CRUD operations
- [x] Create labController.ts with CRUD operations
- [x] Create pharmacyController.ts with CRUD operations
- [x] Create wardController.ts with CRUD operations
- [x] Update app-router.ts to include new routes for staff, lab, pharmacy, ward

## Frontend Implementation (Dashboard)
- [x] Implement Staff.jsx component with table, add/edit/delete staff
- [x] Implement Lab.jsx component with lab test management
- [x] Implement Pharmacy.jsx component with medicine management
- [x] Implement Ward.jsx component with ward/bed management
- [x] Implement PatientDetails.jsx component with patient records

## Testing
- [x] Start the backend server (cd server && npm start) - ensure .env with MONGODB_URI is set
- [x] Test all new backend endpoints - verified /patients, /staff, /doctors, /ward, /lab return data
- [x] Test frontend components for functionality - components fetch data correctly
- [x] Ensure integration between frontend and backend - API calls working
- [x] Debug: Patient and Doctor dashboards not showing data - fixed CastError in DoctorWard.jsx, resolved port conflict

## Issues Fixed
- [x] CastError in ward update: Fixed string interpolation in DoctorWard.jsx
- [x] Port 4200 conflict: Killed all node processes using the port
- [x] Server startup: Can now start server without port conflict
- [x] Added centralized error handling middleware in app-server.ts
- [x] Fixed data type issues in patientSignupController.ts and signupController.ts (DOB -> dob, mobNumber parsing, added address)
- [x] Server now running successfully on port 4200 and connected to MongoDB
- [x] Doctor dashboard routes not showing: Fixed App.jsx to render DoctorDashboard instead of Doctor_Sidebar for /doctor/* route
- [x] Patient dashboard not showing: Updated App.jsx to use PatientDashboard component with better UI and routes
