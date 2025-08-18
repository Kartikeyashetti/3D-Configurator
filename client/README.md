# 3D Configurator Client

## Features

### Authentication System
- **User Registration**: Create new accounts with username, email, and password
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Admin-only access to admin panel
- **Session Management**: Persistent login state with localStorage
- **Role-based Access**: Different permissions for users and admins

### User Management (Admin Only)
- **View All Users**: List all registered users
- **Delete Users**: Remove user accounts (except admins)
- **User Roles**: Display user roles (user/admin)

### UI Components
- **Responsive Forms**: Login and registration forms with validation
- **Navigation Header**: Dynamic header showing login status and admin links
- **Protected Routes**: Automatic redirection for unauthorized access
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
- **Main App**: `http://localhost:5173/`
- **Login**: `http://localhost:5173/login`
- **Register**: `http://localhost:5173/register`
- **Admin Panel**: `http://localhost:5173/admin` (admin only)

## Authentication Flow

1. **Registration**: Users can create accounts with unique username/email
2. **Login**: Users authenticate and receive JWT token
3. **Session**: Token stored in localStorage for persistent sessions
4. **Protected Routes**: Admin routes require valid admin token
5. **Logout**: Clear session and redirect to home

## Admin Access

To access the admin panel:
1. Register a new user account
2. Manually update the user role to "admin" in the database
3. Or use the server script: `npm run create-admin`

Default admin credentials:
- Username: `admin`
- Password: `admin123`
- Email: `admin@example.com`

## File Structure

```
src/
├── context/
│   └── AuthContext.jsx          # Authentication state management
├── components/
│   └── ProtectedRoute.jsx       # Route protection component
├── Pages/
│   ├── Login.jsx                # Login form
│   ├── Register.jsx             # Registration form
│   ├── Admin.jsx                # Admin dashboard
│   └── Login.css                # Authentication styles
├── Blocks/
│   └── Header/                  # Navigation header
└── main.jsx                     # App entry point with routing
```

## API Integration

The client communicates with the backend server at `http://localhost:5000`:
- Authentication endpoints for login/register
- User management endpoints for admin operations
- JWT token-based authentication for protected routes
