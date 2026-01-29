# Mood Tracker - A minimal mood reflection app

<!-- markdownlint-disable MD045 -->
<!-- markdownlint-disable MD033 -->

<p align="center">
  <img src="assets/screenshots/00-login-screen.png" width="200" style="border-radius: 25px; margin: 6px;"/>
  <!-- <img src="assets/screenshots/01-default-screen.png" width="200" style="border-radius: 25px; margin: 6px;" /> -->
  <img src="assets/screenshots/02-new-mood-entry.png" width="200" style="border-radius: 25px; margin: 6px;"/>
  <img src="assets/screenshots/03-mood-update-screen.png" width="200"style="border-radius: 25px; margin: 6px;" />
  <img src="assets/screenshots/05-rate-limit-alert.png" width="200" style="border-radius: 25px; margin: 6px;"/>
</p>

<p align="center">
    Below is a short screen recording demonstrating mood creation, update, rate limiting, and deletion.
</p>
<p align="center">
    <img src="assets/demo/mood-app-demo.gif" width="250" style="margin-horizontal: auto;" />
</p>
<!-- ▶️ [Watch demo](assets/demo/mood-app-demo.gif) -->

## Overview

This project is a single-barber appointment booking mobile app built as a focused MVP to demonstrate end-to-end product thinking, not just UI screens.

The app allows users to book appointments using predefined availability slots, while giving the barber full control over approvals, and rejections. All booking decisions are driven by real database constraints to prevent invalid states such as double bookings or unavailable times.

The system is intentionally designed for clarity, reliability, and simplicity, mirroring real-world service booking workflows.

## Tech Stack

- Mobile: Expo (React Native)
- Language: TypeScript
- Backend: Supabase (PostgreSQL, Auth, Row Level Security)
- Tooling: Git, GitHub, VS Code, Bash Terminal

## Features

- User authentication and session-based data access

### Users can

- Select a date
- Submit an appointment request
- See real-time appointment status (pending / approved / rejected)

### The barber can

- View all appointment requests
- Approve or reject pending appointments

### The app enforces

- Role-based UI behavior (barber vs user)
- State-driven rendering for appointment lifecycle

## Running the app locally

- git clone <https://github.com/nkolonzilucky/aboutTheBarber>
- cd aboutTheBarber
- npm install
- Ensure you have a .env file with the following variables: EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
- npx expo start

## Feature Improvements

- add schedule management
-
