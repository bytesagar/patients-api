## NODEJS Patients API

This API provides the patient data, provided by the staffs or doctors in the hospital. Admin are doctors which has a admin role authorized. They can Create, Read, Update, Delete the patient data.

Users are authenticated with JWT Token

---

## How to Setup

- `git clone https://github.com/sagar608/patients-api.git`
- `cd patients-api`
- `npm install`
- Configure .env file inside config/.env.example
- `npm run dev`

## API Endpoints

---

#### Patients

- GET /api/v1/patients/
- POST /api/v1/patients/
- GET /api/v1/patients/{:id}
- PUT /api/v1/patients/{:id}
- DELETE /api/v1/patients/{:id}
- PUT /api/v1/patients/{:id}/photo

#### Users

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/me
