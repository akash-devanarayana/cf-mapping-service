# CF Mapping Service

A mapping service for the CyFix Framework that provides APIs to manage selector mappings.

## Overview

The CF Mapping Service is a Node.js application that provides REST APIs for managing selector mappings. It allows you to:

- Retrieve all mappings or filter by version
- Add new mappings
- Update existing mappings
- Update the status of a mapping

The service uses SQLite for data persistence and provides proper validation for mapping objects.

## Project Structure

```
cf-mapping-service/
├── .env                  # Environment variables
├── mocks/                # Mock data
│   └── mappingsMock.js   # Mock mappings for development
├── src/                  # Source code
│   └── index.js          # Core mapping service implementation
├── utils/                # Utility functions
│   ├── SelectorTypes.js  # Selector type definitions
│   └── logger.js         # Logging utility
├── server.js             # Express server setup
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env` file (or use the defaults)

### Running the Service

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

### API Endpoints

#### GET /api/mappings

Retrieves all mappings or filters by version.

Query Parameters:
- `version` (optional): Filter mappings by version

Example:
```
GET /api/mappings?version=v1.0
```

#### POST /api/mappings

Adds a new mapping.

Request Body:
```json
{
  "originalSelector": ".submit-button",
  "newSelector": ".btn-primary",
  "selectorType": "class",
  "appVersion": "v1.0",
  "confidence": 1.0
}
```

## Data Model

### Mapping

| Field            | Type    | Description                                |
|------------------|---------|--------------------------------------------|
| id               | String  | Unique identifier for the mapping          |
| originalSelector | String  | Original selector that needs to be mapped  |
| newSelector      | String  | New selector to use                        |
| selectorType     | String  | Type of selector (class, id, tag, etc.)    |
| appVersion       | String  | Version of the application                 |
| createdAt        | Number  | Timestamp when the mapping was created     |
| updatedAt        | Number  | Timestamp when the mapping was last updated|
| confidence       | Number  | Confidence score for the mapping (0-1)     |

## License

This project is authored by Akash Devanarayana.