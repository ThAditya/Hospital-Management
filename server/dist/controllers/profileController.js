import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './jsonWebToken-Config.js';
import User from '../models/Users.js';
import Doctor from '../models/Doctor.js';
import Admin from '../models/Admin.js';
const profileController = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization header missing or malformed' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const { id, role } = decoded;
        let userProfile;
        if (role === 'admin') {
            userProfile = await Admin.findById(id).select('-password');
        }
        else if (role === 'doctor') {
            userProfile = await Doctor.findById(id).select('-password');
        }
        else if (role === 'patient') {
            userProfile = await User.findById(id).select('-password');
        }
        if (!userProfile) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(userProfile);
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
export default profileController;
