## Description

This project is the backend component of the capstone project `Pembangunan Dashboard Kinerja Pusat Studi`. It was developed using NestJS for the server-side framework and MongoDB as the database, and it is containerized using Docker for ease of deployment. The entire backend was written by me ([Numero Uno Arroefy](https://github.com/UnoArroefy)).

## Instalation

1. **Clone This Repository**

```bash
git clone https://github.com/UnoArroefy/be-capstone.git
cd be-capstone
```

2. **Setting Up Environtment**

create `.env` file simply by copying the `.env.example`
```bash
mv .env.example .env
```

or 

```bash
cp .env.example .env
```

All the environtment variable you need to setup : 

```
PORT=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
MONGO_URL_CONNECTION=
ADMIN_EMAIL=
ADMIN_USERNAME=
```

3. **Run The Application**

Easy way (Docker) :
```bash
docker compose up -d
```

Without Docker :
```bash
npm i
npm run build
npm run start:prod
```

## API Documentation

This application provides a simple REST API for authentication and data management used in the performance dashboard system. Below are the available endpoints.

---

### Auth API (`/api/auth`)

#### `GET /api/auth/google/login`
Initiates the OAuth2 login flow using Google.

#### `GET /api/auth/google/callback`
Handles the OAuth2 callback and returns the authenticated user data.

---

### Data API (`/api/data`)

#### `GET /api/data/:year`
Fetches dashboard data for the specified year.

- **Params:**
  - `year` (number) – The year to retrieve data for.

#### `POST /api/data/upload`
Uploads an Excel file to import data.

- **Body:**
  - `file` (multipart/form-data) – Excel file to be processed.

#### `GET /api/data/file/:year`
Retrieves the uploaded file (Excel) for a specific year.

- **Params:**
  - `year` (string) – The year associated with the file.

---

> **Note:** This application uses Google OAuth2 for authentication. Make sure the environment variables related to Google credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc.) are correctly configured.
