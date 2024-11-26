# URL Shortener API

## Project Overview
A robust URL shortening service built with Node.js, Express, and MongoDB that allows users to:
- Generate short URLs
- Redirect to original URLs
- Track URL usage statistics

## Technology Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Shortid for unique URL generation
- Express Rate Limit

## Prerequisites
- Node.js (v14 or later)
- MongoDB Atlas account

## Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mrrahulkrr/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```



## API Endpoints

### 1. Shorten URL
- **Endpoint**: `POST /shorten`
- **Description**: Create a short URL
- **Request Body**:
  ```json
  {
    "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening"
  }
  ```
- **Success Response**:
  ```json
  {
    "shortUrl": "http://your-domain.com/abc123",
    "shortId": "abc123"
  }
  ```

### 2. Redirect URL
- **Endpoint**: `GET /:shortId`
- **Description**: Redirects to the original URL
- **Success**: Immediate redirect to original URL

### 3. URL Statistics
- **Endpoint**: `GET /stats/:shortId`
- **Description**: Retrieve URL usage statistics
- **Success Response**:
  ```json
  {
    "originalUrl": "https://www.example.com/original/url",
    "clicks": 42,
    "lastAccessed": "2024-01-15T10:30:45.000Z",
    "createdAt": "2024-01-10T15:20:30.000Z"
  }
  ```

## Error Handling
- Invalid URL format returns 400 status
- Non-existent short URLs return 404
- Rate limit exceeded returns 429

## Deployment
Deployed on Render: "https://urlshortener-ekxu.onrender.com"

## Rate Limiting
- 100 requests per minute per IP address



