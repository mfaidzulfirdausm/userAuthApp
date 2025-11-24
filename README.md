# USER AUTHENTICATION APP

## Overview
A simple React Native authentication flow using React Context API, React Navigation, and AsyncStorage. Built entirely online in Expo Snack.

## Features
- Login, Signup, and Home screens
- Context-based auth: login, signup, logout, user state
- Validations: email format, password length, required fields
- Error messages and clean UI
- Save login session with AsyncStorage
- Password visibility toggle

## Tech
- Expo + React Native
- @react-navigation/native, @react-navigation/native-stack
- @react-native-async-storage/async-storage

## Getting Started
1. Download ZIP or clone repository.
2. Install dependencies:
   - npm install
3. Run locally:
   - npx expo start

## Screenshots
![Login Screen](Screenshots/login1.jpeg)
![Login Screen](Screenshots/login2.jpeg)
![Login Screen](Screenshots/signup1.jpeg)
![Login Screen](Screenshots/signup2.jpeg)
![Login Screen](Screenshots/logout1.jpeg)

## Notes
This demo uses an in-memory user store for demonstration. Replace with a backend for production use.
