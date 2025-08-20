# HackHub

**Event & Theme Hosting Platform**

![License:MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Next.js](https://img.shields.io/badge/Next.js-13+-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Geospatial-brightgreen)
![Microsoft-Azure](https://img.shields.io/badge/Microsoft-Azure-blue)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)


HackHub is a modern, scalable Event & Hackathon Hosting Website that empowers organizers, participants, and judges with smooth workflows and real-time engagement.

---

## Features

- Event Creation & Management
- Registration & Teaming
- Project Submission & Evaluation
- Communication & Updates
- Role-based Dashboards
- Analytics dashboard for organizers
- Leaderboard for participants
- Automated certificate generation for participants
- 

  ***

  ## Tech Stacks

  - **Frontend**: Next.js, Typescript, TailwindCSS
  - **Backend**: Next.js server actions, Node.js
  - **Authentication**: Next AuthProvider
  - **Database**: Azure CosmosDB with Mongo API
  - **Hosting**: Vercel

  ***

  ## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aftab48/HackHub.app.git
cd HackHub
```

### 2. Install Dependencies

Make sure you have Node.js v18+ and npm installed.

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` or `.env` file at the root and add your credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=p
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
NEXT_PUBLIC_ADMIN_PASSKEY=
DATABASE_URL=
OPENCAGE_API_KEY=
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Deployment

We recommend deploying via **Vercel**:

1. Connect the GitHub repo to Vercel
2. Set environment variables in the dashboard
3. Deploy!

---

## Contributing

We welcome pull requests!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Authors

- Aftab Alam : https://github.com/Aftab48 → mdalam4884@gmail.com
- Ayushi Mandal : https://github.com/ayushi-stacks → ayushistacks@gmail.com
- Rajdeep Roy : https://github.com/RR-2403 → rajdeeproy2403@gmail.com
- Team: **HELLO_WORLD**

---

## Live App

(https://hackhub-geeks.vercel.app/)

```
Join HackHub.
