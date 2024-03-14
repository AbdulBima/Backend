require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoutes");
const subscriberRoute = require("./routes/subsciberRoute");
const readerRoute = require("./routes/readerRoute");
const messagesRoute = require("./routes/messagesRoute");
const eventRoute = require("./routes/eventRoute");
const eventUserRoute = require("./routes/eventUserRoute");
const orderRoute = require("./routes/orderRoute");
const authRoute = require("./routes/authRoute");
const errorMiddlware = require("./middleware/errorMIddleWare");
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;
const FRONTEND2 = process.env.FRONTEND2;
const allowedOrigins =[FRONTEND, FRONTEND2];
const corsOptions = {
	origin: allowedOrigins,
	optionSuccessStatus: 200,
};

const app = express();


app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/subscriber", subscriberRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/reader", readerRoute);
app.use("/api/event", eventRoute);
app.use("/api/eventUser", eventUserRoute);
app.use("/api/order", orderRoute);

app.use(errorMiddlware);
mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log("connected to mongodb");

		app.listen(PORT, () => {
			console.log(
				`Server running in port ${PORT} :)`
			);
		});
	})
	.catch((error) => {
		console.log(error);
	});
