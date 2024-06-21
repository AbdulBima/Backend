const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

// Create an Employee
const createEmployee = asyncHandler(async (req, res) => {
	const { employeeId, password } = req.body;

	try {
		// Check if the employeeId already exists
		const existingUser = await Employee.findOne({
			employeeId,
		});

		if (existingUser) {
			return res
				.status(400)
				.json({
					error: "Employee ID is already registered",
				});
		}

		// Hash the password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(
			password,
			saltRounds
		);

		// Create a new employee with the hashed password and default admin status (false)
		const newEmployee = new Employee({
			employeeId,
			password: hashedPassword,
			admin: false,
		});

		const savedEmployee = await newEmployee.save();
		res.status(201).json(savedEmployee.employeeId);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Login Employee
const loginEmployee = asyncHandler(async (req, res) => {
	const { employeeId, password } = req.body;

	try {
		// Check if the employee with the provided employeeId exists
		const employee = await Employee.findOne({
			employeeId,
		});

		if (!employee) {
			return res
				.status(401)
				.json({ error: "Cannot find employee" });
		}

		// Compare the provided password with the stored hashed password
		const isPasswordMatch = await bcrypt.compare(
			password,
			employee.password
		);

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ error: "Password incorrect" });
		}

		// Passwords match, so you can proceed with user authentication

		// Generate JWT token
		const token = jwt.sign(
			{
				staffId: employee.employeeId,
				employee_ID: employee._id,
				admin: employee.admin,
			},
			JWT_KEY,
			{ expiresIn: "2h" }
		);

		// Send the token back to the client
		res.json({
			token: token,
			message: "Login successful",
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Logout employee
// const logoutEmployee = asyncHandler(async (req, res) => {
// 	try {
// 		// Clear the JWT token cookie
// 		res.clearCookie("token");
// 		res.json({ message: "Logout successful" });
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });

// Get all Employees
const getAllEmployees = asyncHandler(async (req, res) => {
	try {
		const employees = await Employee.find({});
		res.status(200).json(employees);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Get Employee by id
const getEmployeeById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const employee = await Employee.findById(id);
		res.status(200).json(employee);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Update Employee Admin Status
const updateEmployeeAdminStatus = asyncHandler(
	async (req, res) => {
		const { changeeId, changerId } = req.params;

		try {
			// Find the changer employee by ID
			const changer = await Employee.findById(
				changerId
			);

			// If changer is not found or is not an admin, return 403 Forbidden
			if (!changer || !changer.admin) {
				return res
					.status(403)
					.json({ error: "Unauthorized" });
			}

			// Find the changee employee by ID
			const changee = await Employee.findById(
				changeeId
			);

			// If changee is not found, return 404 Not Found
			if (!changee) {
				return res
					.status(404)
					.json({ error: "Employee not found" });
			}

			// Update the admin status of the changee to true
			changee.admin = true;

			// Save the updated changee
			const updatedChangee = await changee.save();

			// Respond with the updated changee
			res.status(200).json(updatedChangee);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				error: "Internal Server Error",
			});
		}
	}
);

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	loginEmployee,
	// logoutEmployee,
	updateEmployeeAdminStatus,
};
