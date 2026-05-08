# National Cybersecurity Defense Framework

Professional MongoDB database implementation for the National Cybersecurity Defense Framework using Node.js and Mongoose.

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

```bash
npm install
```

Create or update `.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/national_cybersecurity_defense
NODE_ENV=development
```

## Available Scripts

```bash
npm run start
npm run seed
npm run create-indexes
```

## What Each Script Does

- `npm run start`: loads the environment and establishes the MongoDB connection.
- `npm run seed`: seeds permissions, roles, settings, users, resources, preferences, training data, events, alerts, incidents, and reports.
- `npm run create-indexes`: synchronizes schema indexes for all registered models.

## Project Structure

```bash
src/
├── app.js
├── config/
├── database/
│   ├── aggregations/
│   ├── connection/
│   ├── crud/
│   ├── enums/
│   ├── indexes/
│   ├── models/
│   └── seeders/
└── services/
```

## Notes

- Report documents only store PDF metadata. Actual PDF generation and storage should happen in a backend service layer.
- Passwords are hashed with `bcryptjs` before user records are created.
- Model-specific indexes are declared in schema files and can be synchronized with the `create-indexes` script.
