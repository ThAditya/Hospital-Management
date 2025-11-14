# Hospital Management System

A comprehensive hospital management system built with modern web technologies, featuring a public website, internal dashboards for administrators, doctors, and patients, and a robust backend API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### Public Website (Frontend)
- **Home Page**: Welcome page with hospital information and services
- **About Us**: Team information and hospital overview
- **Appointment Booking**: Schedule appointments online
- **Contact Us**: Get in touch with the hospital
- **User Registration**: Sign up as a patient or doctor
- **Login System**: Secure authentication for users

### Internal Dashboards
- **Admin Dashboard**:
  - Manage doctors, patients, and staff
  - Oversee appointments, treatments, and notifications
  - Monitor lab tests, pharmacy inventory, and ward management
  - View analytics and charts

- **Doctor Dashboard**:
  - View and manage patient records
  - Handle treatments and prescriptions
  - Access lab results and ward information
  - Manage assistants and staff

- **Patient Dashboard**:
  - View personal health records
  - Track treatments and medications
  - Access lab results and appointment history
  - Communicate with doctors and staff

### Backend API
- RESTful API with JWT authentication
- MongoDB database integration
- CRUD operations for all entities
- AI-powered features using Google Generative AI and OpenAI
- Secure password hashing with bcrypt

## Tech Stack

### Frontend & Dashboard
- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Declarative routing for React
- **Axios**: HTTP client for API requests
- **React Toastify**: Toast notifications
- **Recharts**: Composable charting library
- **Framer Motion**: Animation library (Frontend only)
- **React Icons & Lucide React**: Icon libraries

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **TypeScript**: Typed superset of JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Google Generative AI**: AI integration
- **OpenAI**: AI services
- **CORS**: Cross-origin resource sharing
- **Body-parser**: Request body parsing

### Development Tools
- **ESLint**: Code linting
- **Nodemon**: Automatic server restart
- **Vite Plugin React SWC**: Fast React compilation

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud instance)
- **Git** for version control

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hospital-management
   ```

2. **Install dependencies for each module:**

   **Server (Backend):**
   ```bash
   cd server
   npm install
   ```

   **Dashboard (Internal UI):**
   ```bash
   cd ../Dashboard
   npm install
   ```

   **Frontend (Public Website):**
   ```bash
   cd ../Frontend
   npm install
   ```

3. **Environment Setup:**

   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hospital-management
   JWT_SECRET=your-jwt-secret-key
   GOOGLE_API_KEY=your-google-ai-api-key
   OPENAI_API_KEY=your-openai-api-key
   PORT=4200
   ```

   Replace the placeholder values with your actual API keys and database URI.

## Usage

1. **Start the Backend Server:**
   ```bash
   cd server
   npm run setup
   ```
   This will install dependencies (if needed), fund packages, and start the server on port 4200.

2. **Start the Dashboard (Internal UI):**
   ```bash
   cd ../Dashboard
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`

3. **Start the Frontend (Public Website):**
   ```bash
   cd ../Frontend
   npm run dev
   ```
   The public website will be available at `http://localhost:5174`

### Available Scripts

- `npm start` (Server): Start the backend server with nodemon
- `npm run fresh` (Server): Clear console and start server
- `npm run setup` (Server): Install dependencies and start server
- `npm run client` (Server): Start the Frontend from server directory
- `npm run dev` (Dashboard/Frontend): Start development server
- `npm run build` (Dashboard/Frontend): Build for production
- `npm run preview` (Dashboard/Frontend): Preview production build
- `npm run lint` (Dashboard/Frontend): Run ESLint

## API Endpoints

The backend provides RESTful API endpoints for all hospital management operations:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/signup` - User registration
- `POST /api/auth/patient-signup` - Patient registration

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Treatments
- `GET /api/treatments` - Get all treatments
- `POST /api/treatments` - Create treatment
- `PUT /api/treatments/:id` - Update treatment
- `DELETE /api/treatments/:id` - Delete treatment

### Staff
- `GET /api/staff` - Get all staff
- `POST /api/staff` - Create staff
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff

### Pharmacy
- `GET /api/pharmacy` - Get all medicines
- `POST /api/pharmacy` - Add medicine
- `PUT /api/pharmacy/:id` - Update medicine
- `DELETE /api/pharmacy/:id` - Delete medicine

### Lab
- `GET /api/lab` - Get all lab tests
- `POST /api/lab` - Create lab test
- `PUT /api/lab/:id` - Update lab test
- `DELETE /api/lab/:id` - Delete lab test

### Ward
- `GET /api/ward` - Get all wards
- `POST /api/ward` - Create ward
- `PUT /api/ward/:id` - Update ward
- `DELETE /api/ward/:id` - Delete ward

### Notifications
- `GET /api/notifications` - Get all notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id` - Update notification
- `DELETE /api/notifications/:id` - Delete notification

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard data

## Project Structure

```
hospital-management/
├── Dashboard/          # Internal dashboards (Admin, Doctor, Patient)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin-Dashboard/
│   │   │   ├── Doctor-Dashboard/
│   │   │   └── Patient-Dashboard/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── Frontend/           # Public website
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home/
│   │   │   ├── AboutUs/
│   │   │   ├── Appointment/
│   │   │   ├── ContactUs/
│   │   │   └── Register/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/             # Backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── app-server.ts
│   │   ├── app-router.ts
│   │   └── ...
│   ├── package.json
│   └── tsconfig.json
├── README.md           # This file
├── TODO.md             # Project progress tracker
└── license             # License file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [license](license) file for details.

---

**Author:** Aditya Vashishth
**Version:** 1.0.0
