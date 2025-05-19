# NQuiz Frontend

This is the frontend application for NQuiz, a quiz management system.

## Features

- User authentication (login/register)
- Profile management
- Dashboard with quiz management
- Modern and responsive UI using Material-UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd CAP2-NQUIZ-_FE
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_API_URL=https://cap2-nquiz-fe.onrender.com
   ```

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at `https://cap2-nquiz-fe.onrender.com`

## Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── services/      # API services
  ├── App.js         # Main application component
  ├── index.js       # Application entry point
  └── reportWebVitals.js
```

## Technologies Used

- React
- Material-UI
- React Router
- Axios
- Web Vitals
