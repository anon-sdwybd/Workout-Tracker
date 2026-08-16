# Changelog

All notable changes to this project will be documented in this file.

## [v1.4] - 2026-08-16

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

---
## [v1.3] - 2026-08-04
## Backend & Database

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
## [v1.2] - 2026-07-20

### Added
- Added workout editing functionality.
- Added workout deletion functionality.
- Added automatic saving using Local Storage.
- Added automatic loading of saved workouts when reopening the application.
- Added dynamic workout card generation using JavaScript template literals.
- Implemented Edit Mode for updating existing workouts.

### Improved
- Refactored the project into dedicated functions for:
  - Adding workouts
  - Editing workouts
  - Deleting workouts
  - Displaying workouts
  - Starting Edit Mode
  - Submitting workouts
- Improved code organization and readability.
- Workout list now refreshes automatically after every modification.
- Form automatically resets after adding a workout.

### Fixed
- Fixed workouts not displaying after refreshing the page.
- Fixed Local Storage synchronization issues.
- Fixed deleting workouts not updating saved data correctly.
- Fixed edited workouts creating duplicates instead of replacing existing ones.
- Fixed Edit Mode remaining active after saving changes.

### Known Issues
- Form is not yet reset after completing an edit.
- No visual indicator to show when Edit Mode is active.
- Workout cards continue in a single vertical column instead of wrapping into multiple columns when many workouts are added.

## [v1.1] 2026-07-18

### Added
- Redesigned the user interface.
- Added a floating form card.
- Displayed workouts using individual workout cards.
- Implemented Flexbox for page layout.
- Added separators between workout information.
- Improved spacing and overall styling.
- Organized project files into separate **CSS** and **JavaScript** folders.
- Added project documentation (`README.md` and `CHANGELOG.md`).
- Began using Git and GitHub for version control.

### Improved
- Cleaner overall layout.
- Better visual hierarchy.
- More organized project structure.

### Learning Highlights
- Flexbox layouts
- CSS descendant selectors
- Git basics
- GitHub commits
- Project documentation

---

## [v1.0] 2026-07-15

### Initial Release

### Features
- Add workouts using a form.
- Store workouts using JavaScript arrays and objects.
- Display workouts dynamically using DOM manipulation.
- Use JavaScript template literals to generate HTML.

### Learning Highlights
- Variables
- Functions
- Arrays
- Objects
- `push()`
- `for...of` loops
- `innerHTML`
- Template literals
- Basic DOM manipulation
- Connecting HTML, CSS, and JavaScript

### Future Goals (At the Time)
- Improve the user interface.
- Learn CSS layout techniques.
- Save workouts using localStorage.
- Add edit and delete functionality.
- Build a more professional-looking application.
