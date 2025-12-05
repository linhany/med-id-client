# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a medical patient dashboard React application for urgent care clinics. It allows doctors to view their consultation schedules, review patient medical records, and conduct consultations with diagnosis entry.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:3000)
npm start

# Build for production
npm build

# Run tests
npm test
```

## Architecture

### State Management - Redux

The application uses Redux with Redux Thunk for async actions:

- **Store**: Configured in `src/store.js` with Redux DevTools support
- **Reducers**: Located in `src/reducers/`
  - `getDoctorAppointments` - manages daily appointment schedule
  - `getPatientMedicalRecord` - manages patient medical records
  - `getDoctorInfo` - manages doctor profile information
  - `postReducer` - handles post actions
- **Actions**: Located in `src/actions/`
  - All action type constants are defined in `src/actions/constants.js`
  - Actions follow the pattern: GETTING → GOT → GOT_ERROR

### Routing Structure

The app uses React Router with a nested routing structure defined in `src/App.js`:

- `/doctor/:doctorId/overview` - Doctor overview page
- `/doctor/:doctorId/consultation-schedule` - Daily consultation schedule
- `/patient` - Patient consultation and medical record view

All routes are wrapped in a `Master` component that provides the navigation drawer and app bar.

### Component Architecture

**Layout Components:**
- `Master` (`src/components/pages/Master/`) - Main layout with collapsible Material-UI drawer navigation and app bar. Extracts doctorId from URL path (position 8-9).

**Page Components:**
- `Overview` - Doctor overview dashboard
- `ConsultationSchedule` - Shows appointments grouped by hour, fetches data on mount using doctorId from URL
- `Patient` - Main patient consultation interface with tabbed navigation and medical history

**Common Components:**
- `Card` - Reusable card component
- `Dialogs` - Dialog components
- `StyledText` - `StyledTitle` and `StyledContent` text components
- `formatTime` - Time formatting utilities
- `getAvatarMapping` - Avatar mapping utilities

### Patient Page Details

The Patient page (`src/components/pages/Patient/`) is the most complex component:

- **Tabs**: Today's Consultation, Surgeries/Procedures, Clinical Notes, Medication List, Vaccination, Insurance
- **State Management**: Tracks selected medical history, new consultation data, and diagnosis entry mode
- **Key Features**:
  - Start Diagnosis - enters diagnosis mode showing `DiagnosisFormContainer`
  - Medical History - displays past consultations with detail view
  - End Session - saves new consultation to medical history and posts to backend
- **Sub-components**:
  - `Blocks.jsx` - InfoBlock, AppointmentBlock, ChiefComplaintBlock, DiagnosisBlock
  - `MedicalHistoryList.jsx` - List and detail views of past consultations
  - `DiagnosisFormContainer.jsx` - Form for entering diagnosis, prescriptions, and referral notes

### Data Flow Patterns

1. Components dispatch actions on mount via `componentWillMount()`
2. Actions make async fetch calls and dispatch success/error actions
3. Reducers update state based on action types
4. Components receive updated state via `mapStateToProps`
5. Doctor ID is extracted from URL pathname using `window.location.pathname.substring(8,9)`

## Styling

- Material-UI v1 components with custom styling via `withStyles`
- Component-specific CSS files (e.g., `Patient.css`, `Master.css`)
- Roboto typeface imported globally
- Custom color scheme with primary blue: `#1C8DB1`

## Important Notes

- The app assumes a specific URL structure for doctor routing with doctorId at a fixed position
- Medical records are stored and manipulated as JSON strings
- Patient medical history includes a restore JSON string for session end functionality
- Some API endpoints reference JSONPlaceholder (placeholder API) - these should be replaced with actual backend endpoints
- The codebase includes Fitbit API integration code in `src/services/Api.js` (appears to be from original Redux tutorial, may not be actively used)
- Always use Material-UI components