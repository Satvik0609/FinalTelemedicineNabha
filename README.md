
## 🎥 Project Demo
<video https://youtu.be/tfaOKdSpPRE>

# Telemedicine Platform

A comprehensive telemedicine web application with AI-powered features, built using React.js and Node.js.

## Features

### Frontend (React.js)
- 🔐 Firebase Authentication (Google OAuth + Email/Password)
- 🌍 Multi-language support (English, Hindi, Punjabi)
- 🎨 Beautiful Material-UI design
- 📱 Responsive design for all devices
- 🤖 AI-powered symptom checker
- 📁 Health record upload and AI analysis
- 💊 Prescription management
- 📹 Video consultation with WebRTC
- 🏥 Role-based dashboards (Patient, Doctor, Pharmacist)
- 💾 Offline support with IndexedDB

### Backend (Node.js + Express)
- 🔧 Express.js server with CORS
- 🔥 Firebase Admin SDK for authentication
- 🤖 Hugging Face AI integration
- 📁 File upload with Multer
- 🔄 Real-time updates with Socket.IO
- 💊 Medicine inventory management
- 📊 Health record analysis
- 🎥 WebRTC signaling for video calls

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project
- Hugging Face API key

### Frontend Setup
\`\`\`bash
cd frontend
npm install
\`\`\`

### Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

### Environment Configuration

#### Frontend (.env)
\`\`\`
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id

# API Configuration
REACT_APP_API_URL=http://localhost:3000
REACT_APP_SOCKET_URL=your-socket-url

\`\`\`

#### Backend (.env)
\`\`\`
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_CLIENT_ID=your-firebase-client-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket

# AI Configuration
HUGGINGFACE_API_KEY=your-huggingface-api-key

# Database Configuration
MONGODB_URI=your-mongodb-uri

# JWT Configuration
JWT_SECRET=your-jwt-secret

\`\`\`

## Running the Application

### Start Backend Server
\`\`\`bash
cd backend
npm start
# Server runs on http://localhost:5000
\`\`\`

### Start Frontend
\`\`\`bash
cd frontend
npm start
# App runs on http://localhost:3000
\`\`\`

## Usage

1. **Login**: Choose your role (Patient/Doctor/Pharmacist) and sign in
2. **Patient Dashboard**: 
   - Use AI symptom checker
   - Upload health records for analysis
   - View prescriptions
   - Start video consultations
3. **Doctor Dashboard**:
   - Accept video calls
   - View patient reports
   - Create prescriptions
   - Manage hospital inventory
4. **Pharmacist Dashboard**:
   - Manage medicine inventory
   - Track stock levels
   - Update medicine information

## Architecture

### Frontend Stack
- React.js 18
- Material-UI 5
- React Router DOM
- Firebase SDK
- PeerJS for WebRTC
- i18next for internationalization
- Axios for API calls
- Socket.IO client

### Backend Stack
- Node.js + Express.js
- Firebase Admin SDK
- Hugging Face Inference API
- Socket.IO for real-time features
- Multer for file uploads
- CORS for cross-origin requests

## API Endpoints

- `POST /api/analyze-symptoms` - AI symptom analysis
- `POST /api/upload-records` - Upload health records
- `GET /api/prescriptions` - Get user prescriptions
- `POST /api/prescriptions` - Create prescription (Doctor only)
- `GET /api/inventory` - Get medicine inventory
- `POST /api/inventory` - Add/update medicine

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
