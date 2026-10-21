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
GET    /api/v1/plants        - Loads all plant cards on the main page
GET    /api/v1/plants/:slug  - Loads one plant on the detail page
POST   /api/v1/plants        - Adds a plant from the Add Plant form
PATCH  /api/v1/plants/:slug  - Updates a plant with the Edit button
DELETE /api/v1/plants/:slug  - Removes a plant with the Delete button
```

Added, edited, and deleted plants reset when the server restarts.
