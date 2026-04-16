# Kibanda

Kibanda is a student-focused campus marketplace and services platform built to help university students connect, trade, and grow within their campus communities.

- The platform allows students to:

* Buy and sell items
* Find hostels and accommodation
* Hire tutors
* Offer services such as tech repair, graphic design, photography, web development, hair braiding, and more
* Manage their own listings through a personal dashboard

The goal of Kibanda is to bring everyday student needs into one organized platform instead of forcing students to jump between WhatsApp groups, Telegram channels, and random campus notice boards. Humanity really looked at campus chaos and decided, “this is fine.” Kibanda tries to fix that.

---

# Features

## Authentication

* User sign up and login with Firebase Authentication
* Protected pages for logged-in users only
* Personalized navbar showing logged-in user information
* Logout functionality

## Services Marketplace

* Browse available student services
* Search and filter services by category
* Category-based navigation from the Services page to Listings
* Explore services such as tutoring, tech repair, graphic design, photography, fitness training, web development, and more

## Add Service

* Logged-in users can post their own services
* Users can add:

  * Service title
  * Category
  * Description
  * Price
  * Contact details
  * Location
  * Optional image

## Listings Page

* Displays all services saved in Firebase Firestore
* Category filtering support
* Search functionality
* Protected so only logged-in users can access it

## Dashboard

* Logged-in users can view only their own posted services
* Users can:

  * View their services
  * Delete their services
  * Manage their listings
* Dashboard statistics such as total services and categories used

---

# Tech Stack

## Frontend

* React
* React Router DOM
* CSS

## Backend / Database

* Firebase Authentication
* Firebase Firestore

## Deployment

* Vercel

---

# Project Structure

```bash
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Auth.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── Services.jsx
│   ├── Listings.jsx
│   ├── AddService.jsx
│   ├── Dashboard.jsx
│
├── firebase.js
├── App.jsx
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/kibanda.git
```

Move into the project folder:

```bash
cd kibanda
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Firebase Setup

Create a Firebase project and enable:

* Authentication
* Firestore Database

Add your Firebase config inside:

```js
firebase.js
```

Example:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

# Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /services/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

# Future Improvements

Potential future features for Kibanda include: 

* Messaging between users
* Admin moderation panel
* Payment integration

---

# Why I Built This

> As a student, I noticed that many campus services are scattered across WhatsApp groups, social media pages, and word of mouth. It becomes difficult for students to find trusted tutors, affordable hostels, skilled service providers, or even simple items for sale.

> Kibanda was built to solve that problem by creating one central platform where students can easily connect and support each other.

---
 # Repository & Demo links

GitHub: [Repository](https://github.com/josephgakono/Kibanda)

LiveDemo: [Live demo]()
