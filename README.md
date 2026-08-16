# Workout Tracker

A personal workout-tracking web application built as a full-stack project using HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

The goal of the project is to allow users to manage their accounts and eventually create, save, and track their workouts through a simple web interface.

## Current Features

### Account System

* User registration and authentication
* JWT-based authentication
* Login and logout functionality
* Protected API routes
* Profile information retrieval and editing

### Profile System

* Username editing
* Display name editing
* Bio editing
* Profile picture selection and saving
* Profile information displayed dynamically from the backend

### Settings

* Account details display
* Username, display name, and email retrieval
* Logout functionality

## Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **Database:** MongoDB / Mongoose
* **Authentication:** JSON Web Tokens (JWT)
* **Development:** Visual Studio Code

## Project Status

The account and profile system is currently functional.

The next stage of development focuses on polishing the existing login and settings interfaces and expanding the workout creation and tracking system.

## Planned Features

* Workout creation
* Additional workout configuration options
* Saving workouts to the user's account
* Viewing saved workouts
* Editing and deleting workouts
* Workout history and tracking
* Further UI/UX improvements

## Running the Project

Install the project's dependencies:

```bash
npm install
```

Then start the backend server using the project's configured start command.

The application is currently under active development, so setup and available features may change as development continues.

## Project Goals

This project is also being developed as a learning and portfolio project. It is intended to demonstrate practical experience with frontend development, backend APIs, authentication, databases, and connecting different parts of a full-stack application.


# Changelog

All notable changes to this project will be documented here.

## [v1.3] - 2026-08-04

### Backend & Database

### Added

- MongoDB Atlas support
- Mongoose schema and model
- Environment variable support
- Persistent workout storage

### Changed

- Replaced in-memory array with MongoDB collection
- Converted CRUD routes to asynchronous Mongoose operations

### Fixed

- Workout data disappearing after restarting the server
- MongoDB connection handling
- ObjectId support

---

## [0.1.0] - 2026-08-10

### Added

* User authentication system
* JWT-based authentication for protected routes
* Login and logout functionality
* Profile retrieval through the backend API
* Profile editing through a PUT request
* Username editing
* Display name editing
* Bio editing
* Profile picture selection and saving
* Settings page
* Account details display
* Backend profile validation
* Dynamic rendering of profile information

### Improved

* Frontend and backend communication for profile updates
* Error handling for failed profile requests
* Dynamic profile rendering
* Connection between stored user data and the settings interface

### Fixed

* Profile update route returning incorrect results
* Profile data disappearing after updates
* Profile picture data not being included in profile updates
* DOM element lookup errors caused by incorrect IDs
* Profile picture path handling through `FileReader`
