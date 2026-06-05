# CoreBites Project Features

This file describes the main features implemented in the CoreBites app without exposing internal lesson schema details.

## Frontend

- React + Vite application
- Client-side routing with React Router
- Responsive lesson dashboard and lesson player
- Dynamic lesson rendering based on lesson content data
- User-facing lesson purchase and progress flow
- Admin interface for lesson preview and management
- Clean UI patterns for observation, explanation, quiz, and practice sections

## Authentication

- OAuth integration with Google sign-in
- Email/password auth for normal users
- Admin sign-in with role-based access control
- JWT-based authorization for protected routes
- Token storage in localStorage for session persistence

## Backend

- Express API server
- MongoDB with Mongoose for data storage
- User model with purchased lesson references
- Lesson content storage supporting multiple section types
- Protected endpoints via authentication middleware
- Admin-only endpoints for lesson creation, update, and preview

## Lesson and content features

- Lessons are delivered as structured content sections
- Supports multiple section types such as:
  - observation
  - concept intro
  - interactive questions
  - practice groups
  - deep explanation
  - script and code examples
- Quiz and practice interactions are supported on the frontend
- Lesson content is rendered dynamically from saved lesson data

## User experience

- Purchase flow for users to access lessons
- Lesson list and lesson detail page with direct navigation
- Error handling for missing lessons and auth issues
- Progress controls for continuing through lesson sections

## Notes

- This feature doc is intentionally high-level and does not expose implementation-specific lesson schema rules.
- For schema or data modeling details, refer to the backend models and lesson rendering components directly.
- Some features and design refinements were built with AI assistance to speed development and improve the learning flow.
