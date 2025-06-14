# Virtual-Park
**Virtual Park** is a full-stack platform designed to streamline parking operations through three integrated apps: a digital vehicle registration system for drivers, an OCR-based enforcement tool for attendants, and a comprehensive administration dashboard for parking managers.
### [Live Site](https://virtual-park.net/)
### [WIKI](https://github.com/CSE187-W25-Group08/virtual-park/wiki)
---
## Tech Stack

#### Frontend
- **Next.js (React)** – For fast, server-rendered UI and routing.
- **Material UI (MUI)** –  The component building blocks of the UI.

#### Backend
- **Node.js with Express** – REST + GraphQL API microservices server architecture.
- **TSOA** – For Type-safe Restful APIs.
- **TypeGraphQL** – For Declarative GraphQL APIs.

#### Authentication
- **Custom JWT Auth** – Secure in-house email/password system.
- **OAuth 2.0 Integration**– Support for Google login and identity linking to member UUIDs.
- **Middleware-Based Role Checking** – Role-based access controlled via Express middleware and custom Auth Service.

#### Infrastructure & Database
- **PostgreSQL (Dockerized)** – Relational data storage for users, vehicles, permits, and more.
- **Docker** – Containerized deployment for consistency across environments.

#### External Services
- **Google Cloud APIs** – Optical character recognition for license plate extraction, and oAuth for login.
- **Stripe** – Payment processing for parking fees via secure checkout sessions.
- **Mailgun API** – Transactional email service for verification, notifications, and updates.

#### Testing
- **Vitest + Supertest** – GraphQL and REST API testing.
- **Vitest + React Testing Library** - Combined Frontend + Service Layer Testing within the Next.js framework.
  
#### Deployment
- **Continuous Integration (GitHub Actions)** – Pipeline for automated testing and containerized builds on tagged commits.
- **AWS EC2** – Flexible and scalable deployment on AWS EC2 instances.

---

