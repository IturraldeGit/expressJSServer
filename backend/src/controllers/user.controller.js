import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validations
        // check if all fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        
        // check if username is unique
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        //create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({ 
            message: 'User created successfully', 
            user: { 
                id: user._id, 
                email: user.email, 
                username: user.username 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        //check if user exists
        const { email, password } = req.body;

        const user = await User.findOne({ 
            email: email.toLowerCase(),
        });

        if (!user) return res.status(400).json({ 
            message: 'User not found' 
        });

        // check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ 
            message: 'Incorrect password'
        });

        // login user
        res.status(200).json({ 
            message: 'User logged in successfully',
            user: { 
                id: user._id, 
                email: user.email, 
                username: user.username 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ 
            email
        });

        if (!user) return res.status(400).json({
            "message": "User not found"
        });

        res.status(200).json({
            "message": "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message
        });
    }
};
export {
    registerUser,
    loginUser,
    logoutUser
};