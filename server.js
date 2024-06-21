require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const compression = require('compression');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');

// Import routes
const productRoute = require("./routes/productRoutes");
const subscriberRoute = require("./routes/subsciberRoute");
const leaveRoute = require("./routes/leaveRoute");
const readerRoute = require("./routes/readerRoute");
const messagesRoute = require("./routes/messagesRoute");
const eventRoute = require("./routes/eventRoute");
const minnaRoute = require("./routes/minnaRoute");
const eventUserRoute = require("./routes/eventUserRoute");
const employeeRoute = require("./routes/employeeRoute");
const orderRoute = require("./routes/orderRoute");
const authRoute = require("./routes/authRoute");
const employeeTKNroute = require("./routes/employeeTKNroute");

// Import middleware
const errorMiddleware = require("./middleware/errorMIddleWare");
const cors = require("cors");

// MongoDB and server configuration
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;
const FRONTEND2 = process.env.FRONTEND2;
const FRONTEND3 = process.env.FRONTEND3;
const FRONTEND4 = process.env.FRONTEND4;
const FRONTEND5 = process.env.FRONTEND5;
const FRONTEND6 = process.env.FRONTEND6;
const FRONTEND7 = process.env.FRONTEND7;
const FRONTEND8 = process.env.FRONTEND8;
const FRONTEND9 = process.env.FRONTEND9;
const FRONTEND10 = process.env.FRONTEND10;
const FRONTEND11 = process.env.FRONTEND11;







const app = express();

// Middlewares
app.use(helmet()); // Security middleware
app.use(morgan('combined')); // Logging middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cors({ origin: [FRONTEND2, FRONTEND3, FRONTEND4 , FRONTEND5 , FRONTEND6, FRONTEND7, FRONTEND8, FRONTEND9, FRONTEND10, FRONTEND11, ], credentials: true }));
app.use(compression()); // Enable compression



// Setup Winston for logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Routes
app.use("/api/auth", authRoute);
app.use("/api/employeeTKNroute", employeeTKNroute);
app.use("/api/minna", minnaRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/products", productRoute);
app.use("/api/subscriber", subscriberRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/reader", readerRoute);
app.use("/api/event", eventRoute);
app.use("/api/eventUser", eventUserRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/order", orderRoute);

// Error handling middleware
app.use(errorMiddleware);

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URL)
	.then(() => {
        logger.info("Connected to MongoDB");
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
    });
