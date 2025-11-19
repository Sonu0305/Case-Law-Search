# Case Law Search

A modern web application for searching through Indian case laws using keywords. This project demonstrates a full-stack application with a FastAPI backend providing RESTful APIs and a React frontend for an intuitive user interface.

## Features

- **Keyword Search**: Search case laws by entering keywords like "bail", "FIR", or "custody"
- **Real-time Results**: Instant search results with case name, citation, and summary
- **Responsive Design**: Clean, mobile-friendly interface
- **Mock Data**: Includes sample Indian case law data for demonstration purposes
- **CORS Enabled**: Backend configured to allow frontend communication
- **Error Handling**: Comprehensive error messages for failed searches or server issues

## Tech Stack

### Backend

- **FastAPI**: High-performance web framework for building APIs
- **Python 3.7+**: Programming language
- **Uvicorn**: ASGI server for running the application
- **Pydantic**: Data validation and serialization

### Frontend

- **React 18**: JavaScript library for building user interfaces
- **JavaScript (ES6+)**: Programming language
- **CSS**: Styling for responsive design
- **Create React App**: Build setup and development server

## Prerequisites

Before running this application, ensure you have the following installed:

- **Python 3.7 or higher**
- **Node.js 14 or higher** (includes npm)
- **Git** (for cloning the repository)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/case-law-search.git
   cd case-law-search
   ```

2. **Set up the backend:**

   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

## Usage

1. **Start the backend server:**

   ```bash
   cd backend
   # Activate virtual environment if not already activated
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

2. **Start the frontend development server:**

   ```bash
   cd frontend
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

3. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`
   - Enter keywords in the search bar (e.g., "bail", "FIR", "custody")
   - View search results with case details

## API Documentation

The backend provides the following RESTful API endpoints:

### GET /

Health check endpoint.

**Response:**

```json
{
  "message": "Case Law Search API",
  "version": "1.0.0",
  "status": "active"
}
```

### GET /api/search?keyword={keyword}

Search for case laws by keyword.

**Parameters:**

- `keyword` (required): Search term (minimum 1 character)

**Response:**

```json
{
  "success": true,
  "keyword": "bail",
  "count": 3,
  "results": [
    {
      "id": 1,
      "case_name": "State of Maharashtra v. Rajendra Singh",
      "citation": "2024 SCC 145",
      "summary": "Landmark judgment on bail conditions in custody cases."
    }
  ]
}
```

**Error Response:**

```json
{
  "detail": "Keyword cannot be empty"
}
```

### GET /api/cases

Retrieve all available case laws.

**Response:**

```json
{
  "success": true,
  "count": 8,
  "results": [
    {
      "id": 1,
      "case_name": "State of Maharashtra v. Rajendra Singh",
      "citation": "2024 SCC 145",
      "summary": "Landmark judgment on bail conditions in custody cases."
    }
  ]
}
```

## Project Structure

```
case-law-search/
├── backend/
│   ├── main.py              # FastAPI application with routes and mock data
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Application styles
│   │   ├── index.js         # React entry point
│   │   └── components/
│   │       ├── SearchBar.jsx    # Search input component
│   │       ├── CaseResults.jsx  # Results display component
│   │       └── LoadingSpinner.jsx # Loading indicator
│   ├── package.json         # Node.js dependencies and scripts
│   └── .gitignore           # Frontend-specific ignore rules
├── .gitignore               # Root-level ignore rules
└── README.md                # Project documentation
```
