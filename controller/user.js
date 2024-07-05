const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });

        // Email exists
        if (foundUser) {
            return res.status(400).send({ errors: [{ msg: "Email already used. Sign up with another one." }] });
        }

        // Hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({ ...req.body });
        newUser.password = hashPassword;

        // Save user
        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { id: newUser._id },
            process.env.SEKRET_KEY,
            { expiresIn: "9999h" }
        );

        res.status(200).send({ msg: "Registration successful", user: newUser, token });
    } catch (error) {
        console.error("Error registering user:", error.message); // Log the error message
        console.error("Stack trace:", error.stack); // Log the stack trace
        res.status(400).send({ msg: "Could not register", error: error.message }); // Send the error response
    }
};
// Sign in
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).send({ errors: [{ msg: 'Wrong credentials' }] });
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if (!checkPassword) {
            return res.status(400).send({ errors: [{ msg: 'Wrong credentials' }] });
        }

        // Generate token
        const token = jwt.sign(
            { id: foundUser._id },
            process.env.SEKRET_KEY,
            { expiresIn: '9999h' }
        );

        res.status(200).send({ msg: 'Login successful', user: foundUser, token });
    } catch (error) {
        res.status(400).send({ msg: 'Could not log in', error });
    }
};