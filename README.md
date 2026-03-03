# Boilerplate Project

This repository contains a boilerplate setup for a full-stack application with a Django backend and a React frontend.

## Project Structure

- **backend/**: Contains the Django backend with JWT authentication, CORS, and PostgreSQL integration.
- **frontend/**: Contains the React frontend built with Vite, Tailwind CSS, and Axios interceptors for API requests.

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.9 or higher)
- PostgreSQL

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the `.env` file based on `.env.example`.
5. Apply migrations:
   ```bash
   python manage.py migrate
   ```
6. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- **Backend**:
  - Django REST Framework
  - JWT Authentication
  - PostgreSQL Database
  - CORS Support

- **Frontend**:
  - React with Vite
  - Tailwind CSS for styling

## Troubleshooting

- Ensure all environment variables are correctly set in the `.env` file.
- Check that PostgreSQL is running and accessible.
- Verify that Node.js and Python versions meet the prerequisites.

## License

This project is licensed under the MIT License.