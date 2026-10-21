# Lawn Almanac API

A simple Plants vs. Zombies app made with JavaScript, Vite, Node.js, and Express.

## Run the app

Start the server:

```bash
cd server
npm install
npm start
```

Start the client in a second terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## API routes

```text
GET    /api/v1/plants
GET    /api/v1/plants/:slug
POST   /api/v1/plants
PATCH  /api/v1/plants/:slug
DELETE /api/v1/plants/:slug
```

Added, edited, and deleted plants reset when the server restarts.
