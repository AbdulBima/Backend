# General Purpose Backend Server


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Middleware Used](#middleware-used)
- [MongoDB Configuration](#mongodb-configuration)
- [Server Setup](#server-setup)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [License](#license)

## Introduction

This backend server is designed to serve as a foundation for various web development projects. It includes essential middleware, configurations, and structure following the MVC pattern.

## Features

- Middleware setup for security, logging, parsing, CORS handling, compression, and rate limiting.
- Integration with MongoDB for data storage.
- Error handling middleware.
- Logging with Winston.
- MVC architecture for organized code structure.

## Middleware Used

- **Helmet**: Provides security middleware.
- **Morgan**: HTTP request logging middleware.
- **Cookie-Parser**: Middleware for parsing cookies.
- **Express.json()**: Middleware for parsing JSON bodies.
- **Express.urlencoded()**: Middleware for parsing URL-encoded bodies.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Compression**: Middleware for compressing response bodies.

## MongoDB Configuration

The server is configured to connect to MongoDB using the provided environment variables:

- **MONGO_URL**: MongoDB connection URL.

## Server Setup

The server listens on the specified port and connects to MongoDB upon startup.

## Routes

The server defines various routes for different functionalities, including:

- Authentication
- Employee management
- Product management
- Subscriber management
- Leave management
- Messaging
- Event management
- Order management

## Error Handling

The server includes error handling middleware to catch and handle errors throughout the application.

## Logging

Logging is implemented using Winston, with separate log files for errors and combined logs. It also logs to the console in development mode.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
