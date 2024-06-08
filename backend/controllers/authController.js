const User = require('../models/user');
const jwt = require('../config/jwt');

// User registration
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.signToken({ id: user._id, role: user.role });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
