# Overpay — Payment & Transaction Dashboard

Overpay is a frontend-focused web application designed to help users track payments, manage transactions, and gain insights into their financial activity through a clean, dashboard-driven interface.

The application also includes a simulated admin experience, demonstrating how role-based interfaces (RBAC) can be handled on the frontend without a backend.

This project focuses heavily on UI/UX quality, state management, and scalable frontend architecture.

## Live Demo

[View Live Project](#)

<!-- Replace # with your deployed link -->

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/overpay.git
cd overpay
```

# npm install

# npm run dev

Project Overview

The goal of this project was to build a modern, dashboard-heavy financial interface that balances simplicity with functionality.

Rather than overloading the UI, I focused on:

Keeping the interface minimalist but functional
Structuring the app using Atomic Design principles
Building a system that can scale into a real-world product

Tech Stack

Framework: React
Styling: Tailwind CSS (v4)
State Management: Zustand (with persistence)
Animations: Framer Motion
Data Persistence: Zustand Persist (localStorage under the hood)
Core Features
Dashboard
Financial overview in a clean, digestible layout
Role-based variation (Admin vs User views differ slightly)
Designed to prioritize clarity and quick decision-making
Transactions

Users can:
Make payments
View transaction history
Admin can:
Edit transactions
Delete transactions
Shared functionality:
Persistent filtering and sorting
Structured transaction data for easy tracking
Role-Based UI (RBAC Simulation)

The app includes a frontend-only RBAC system:

User Role
Can create and view transactions
Admin Role
Full control (edit + delete transactions)

Role switching is simulated via a toggle to demonstrate how UI and permissions adapt dynamically.

No authentication is implemented — this is purely to showcase frontend RBAC handling.

Architecture & Structure

The project is structured with scalability and separation of concerns in mind:

src/
├── animation/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── store/
├── types/
├── utility/

Key Decisions

- Atomic Design Approach
- Components are kept small, reusable, and composable
- Business logic is separated from UI
- Custom Hooks
- Encapsulate logic and improve reusability
- Help keep components clean and focused
- State Isolation
- Zustand is used globally for predictable state updates
- UI reacts to state changes efficiently without unnecessary complexity

State Management

Global state is handled using Zustand.

Centralized store manages:
Transactions
Role state
Filters
Persistence is achieved using Zustand’s persist middleware:
Automatically saves state to localStorage
Restores state on reload

This approach avoids unnecessary complexity from heavier solutions like Redux while still maintaining scalability.

UI & UX Decisions

The UI is intentionally minimal and dashboard-focused.

Design Goals
Reduce cognitive load
Highlight important financial data
Maintain consistency across views
Key UX Enhancements
Dark and Light Mode
Users can switch between dark and light themes based on preference. This improves accessibility and ensures a comfortable experience across different environments.
Skeleton Loaders
Provide visual feedback during data operations, helping users understand that the system is processing information rather than appearing unresponsive.
Responsive Layout
The interface adapts across different screen sizes, ensuring usability on both desktop and mobile devices.
Subtle Animations
Implemented using Framer Motion to enhance interactions and transitions without distracting from the core functionality.

- - Technical Decisions
- Why Zustand over Redux?

Redux was considered but avoided due to:

Project scope not requiring heavy boilerplate
Zustand offering a simpler, more flexible API
Faster development without sacrificing structure
Why React (not Next.js)?
No need for SSR or routing complexity
Focus was purely on frontend interaction and UI behavior
Separation of Logic & UI

- Business logic is abstracted away from components to:

* Improve maintainability
* Enable reuse across the app
* Keep components as atomic as possible

- Limitations

* No real backend integration
* No authentication system
* Data is stored only in localStorage
* Not suitable for production-scale data handling

- Future Improvements

* Integrate a backend (e.g., Firebase or Node.js API)
* Add authentication and real RBAC enforcement
* Improve performance for larger datasets
* Expand feature set (analytics, notifications, etc.)

- Challenges

One of the biggest challenges was designing a UI that met the assignment requirements while maintaining a clean and minimal look.

Balancing:

- Visual simplicity
- Functional completeness

required multiple iterations and refinements before arriving at the final design.

- What This Project Demonstrates

This project demonstrates my ability to:

- Design scalable frontend architectures
- Implement state management without over-engineering
- Build clean, reusable UI systems using Atomic Design
- Deliver high-quality user experiences with thoughtful UX details

* Final Note
  This is a frontend-focused project built to demonstrate real-world thinking in UI, state management, and architecture, rather than just visual output.
