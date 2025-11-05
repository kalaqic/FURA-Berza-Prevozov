# FURA - Transport Marketplace Project Overview

## Project Description
FURA is a web-based transport marketplace platform that connects people who need transportation services with those who offer them. The platform allows users to search for rides, post ride offers, and manage their transportation needs across Slovenia and neighboring countries.

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **External Services**: EmailJS for email verification
- **Date Picker**: Flatpickr library for date/time selection
- **Styling**: Custom CSS with CSS Grid and Flexbox

## Project Structure

### Root Files
- `index.html` - Main landing page with search functionality
- `package.json` - Node.js dependencies (Firebase, dotenv)
- `firebase.json` - Firebase hosting configuration
- `generate-config.js` - Configuration generator script

### CSS Stylesheets (`/css/`)
- `style.css` - Main styling
- `components.css` - Reusable component styles
- `forms.css` - Form-specific styling
- `modals.css` - Modal dialog styles
- `responsive.css` - Mobile-responsive styles
- `datepicker.css` - Date picker component styling

### JavaScript Modules (`/js/`)
- `main.js` - Core application initialization
- `auth.js` - User authentication and registration
- `search.js` - Ride search and filtering functionality
- `firestore-rides.js` - Firestore database operations
- `autocomplete.js` - Location autocomplete functionality
- `datepicker.js` - Date/time picker implementation
- `modals.js` - Modal dialog management
- `phone-input.js` - International phone number input
- `utils.js` - Utility functions
- `location-data.js` - Geographic location data
- `vehicle-dimensions.js` - Vehicle type definitions
- `firebase-config.js` - Firebase configuration

### HTML Pages (`/pages/`)
- `create-ride.html` - Create new ride posting
- `edit-ride.html` - Edit existing ride posting
- `profile.html` - User profile management
- `login.html` - User login page
- `register.html` - User registration page

## Core Features

### 1. Ride Search System
- **Search Types**: Looking for rides vs. Offering rides
- **Location-based Search**: Country and city selection with autocomplete
- **Date/Time Filtering**: Flexible date and time selection
- **Advanced Filters**: Vehicle type, size, refrigeration requirements
- **Approximate Matching**: Finds rides in nearby locations using geolocation

### 2. User Authentication
- **Firebase Authentication**: Email/password registration and login
- **Email Verification**: Custom verification code system using EmailJS
- **User Profiles**: Personal information and ride history
- **Session Management**: Persistent login state

### 3. Ride Management
- **Create Rides**: Post new ride offers or requests
- **Edit Rides**: Modify existing ride postings
- **Real-time Updates**: Live updates when rides are added/modified/removed
- **Ride Details**: Comprehensive ride information display

### 4. Location Services
- **Autocomplete**: Smart location suggestions for countries and cities
- **Geographic Calculations**: Distance calculations for approximate matches
- **Multi-country Support**: Slovenia and neighboring Balkan countries

### 5. Vehicle Management
- **Vehicle Types**: Cars, vans, trucks, commercial vehicles
- **Dimensions**: Length, width, height specifications
- **Special Features**: Refrigeration capabilities

## Database Schema (Firestore)

### Collections

#### `rides`
```javascript
{
  id: string,
  type: "offering" | "looking",
  fromCountry: string,
  fromCity: string,
  toCountry: string,
  toCity: string,
  date: string (YYYY-MM-DD),
  time: string (HH:MM) | null,
  vehicleType: string,
  vehicleTypeDisplay: string,
  vehicleDimensions: {
    length: number,
    width: number,
    height: number
  },
  hasRefrigerator: boolean,
  description: string,
  price: {
    type: "free" | "negotiable" | "fixed",
    amount: number,
    currency: string
  },
  contact: {
    name: string,
    email: string,
    phone: string
  },
  createdBy: string (user UID),
  createdAt: timestamp,
  formattedDate: string,
  formattedTime: string
}
```

#### `users`
```javascript
{
  uid: string,
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  phone: string,
  emailVerified: boolean,
  verificationCode: string,
  verificationCodeExpiry: timestamp,
  createdAt: timestamp
}
```

## Key Functionalities

### Search Algorithm
1. **Exact Matching**: Direct location and criteria matches
2. **Approximate Matching**: Uses haversine formula for geographic proximity
3. **Real-time Results**: Live updates from Firestore
4. **Combined Results**: Shows exact matches first, then approximate matches

### User Experience Features
- **Responsive Design**: Mobile-first approach
- **Loading States**: Visual feedback during operations
- **Error Handling**: Comprehensive error messages
- **Real-time Updates**: Live ride updates without page refresh
- **Modal Interfaces**: Clean, focused user interactions

### Security Features
- **Firebase Rules**: Server-side security rules
- **Email Verification**: Prevents spam accounts
- **User Authorization**: Ride ownership verification
- **Input Validation**: Client and server-side validation

## Development Setup

### Prerequisites
- Node.js and npm
- Firebase account and project
- EmailJS account for email verification

### Configuration Files Needed
- `js/firebase-config.js` - Firebase project configuration
- EmailJS service configuration in `auth.js`

### Environment Variables
- Firebase API keys and configuration
- EmailJS service IDs and templates

## Deployment
- **Hosting**: Firebase Hosting
- **Database**: Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **CDN**: Firebase CDN for static assets

## Language Support
- **Primary Language**: Slovenian (sl)
- **UI Text**: All interface text in Slovenian
- **Date Format**: DD.MM.YYYY (European format)
- **Time Format**: 24-hour format

## Browser Compatibility
- Modern browsers supporting ES6+
- Mobile-responsive design
- Progressive enhancement approach

This platform serves the Slovenian and Balkan region transport marketplace, focusing on simplicity, real-time functionality, and user-friendly ride matching.