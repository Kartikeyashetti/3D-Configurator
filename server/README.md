# 3D Configurator Server

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the server directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/3d-configurator

# JWT Secret Key (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port (optional, defaults to 5000)
PORT=5000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get all users (admin only)
- `DELETE /api/auth/users/:id` - Delete user (admin only)

## Features
- User authentication with JWT
- Password hashing with bcrypt
- Role-based access control (user/admin)
- Protected admin routes
- User management CRUD operations
