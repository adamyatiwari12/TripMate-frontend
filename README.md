🧩 Project Title

TripMate – An AI-Powered Trip Planning and Expense Management Platform

🚨 Problem Statement

Planning a trip often involves juggling multiple apps or tools — searching destinations, building daily itineraries, tracking expenses, and splitting costs among friends. This leads to confusion, time wastage, and inefficiency.

TripMate aims to solve this by providing an all-in-one platform where users can plan their trips, generate AI-based itineraries, manage expenses, and split costs effortlessly — all within a modern, responsive interface.

🏗️ System Architecture

The system follows a modular three-tier architecture connecting the frontend, backend, and database layers seamlessly.

Architecture Flow:
Frontend (Next.js) → Backend (Express API) → Database (MySQL on Aiven)

The frontend is developed using Next.js (App Router), providing server-side rendering and dynamic client-side routing for a smooth user experience.

The backend is built with Node.js and Express.js, offering RESTful APIs for trip management, itinerary generation, and expense tracking.

The database uses MySQL, hosted on Aiven, ensuring reliable, scalable, and relational data management.

Authentication is implemented using JWT (JSON Web Token) for secure user sessions.

AI Integration is powered by the Gemini API, which generates smart and personalized itinerary suggestions based on the user’s destination and preferences.

The hosting setup includes Vercel for the frontend and Render for the backend, ensuring high performance and global accessibility.

Deployed Links:

🌐 Frontend (Vercel): https://trip-mate-frontend.vercel.app/

⚙️ Backend (Render): https://tripmate-backend-1i7d.onrender.com

✨ Key Features

TripMate provides a complete, user-friendly ecosystem for trip planning and expense management.

Authentication & Authorization: Secure signup, login, and logout using JWT tokens.

Trip Management: Create, view, edit, and delete trips seamlessly.

Home Dashboard: An interactive dashboard displaying upcoming, ongoing, and completed trips, similar to MakeMyTrip.

Itinerary Builder: Manage day-wise itineraries with a highlight for the current day.

AI Trip Suggestions (Gemini API): Get AI-powered attraction and activity suggestions based on your chosen destination.

Expense Tracker: Add and view expenses by category with clear breakdowns.

Expense Splitter: Automatically split costs among trip participants and view settlement amounts.

Data Management: Full CRUD operations with RESTful APIs.

Pagination: Efficient pagination for trips, itineraries, and expenses for better performance.

Searching, Sorting, and Filtering: Quickly find and organize data across different modules.

Frontend Routing: Next.js App Router with pages like /, /login, /dashboard, /trip/[id], /add-trip, and /expenses.

UI/UX: Clean, responsive design built with TailwindCSS and interactive components for smooth navigation.

Hosting: Deployed on Vercel (frontend), Render (backend), and Aiven (MySQL database).

⚙️ Tech Stack

Frontend: Next.js (App Router), React Hooks, Axios, TailwindCSS

Backend: Node.js, Express.js

Database: MySQL (via Aiven)

Authentication: JWT (JSON Web Token)

AI Integration: Gemini API (for AI-based itinerary generation)

Hosting: Vercel (Frontend), Render (Backend), Aiven (Database)

🔗 API Overview

TripMate exposes a RESTful API with secure authentication and CRUD endpoints.

Authentication Endpoints:

POST /api/auth/signup → Register a new user

POST /api/auth/login → Authenticate a user and return a JWT token

Trip Management:

GET /api/trips → Get all trips for the logged-in user

POST /api/trips → Create a new trip

GET /api/trips/:id → Get details of a specific trip

PUT /api/trips/:id → Update trip details

DELETE /api/trips/:id → Delete a trip

Itinerary and Expenses:

POST /api/trips/:id/itinerary → Add or update itinerary for a trip

POST /api/trips/:id/expenses → Add a new expense

GET /api/trips/:id/expenses → Get paginated expenses for a trip

GET /api/trips/:id/split → Calculate and view expense splits among participants

Additional Endpoints:

GET /api/trips?page=1&limit=5 → Paginated trip listing

GET /api/trips/search?query=Goa&page=1 → Search trips or destinations with pagination

All endpoints (except authentication) require JWT authentication.
