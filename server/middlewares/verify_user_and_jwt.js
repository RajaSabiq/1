const Helpers = require('../helpers/helper_functions')
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.status(403).json({ 'status': '403', 'message': 'Forbidden Request' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ where: { email: decode.email } });
        next();
    } catch (error) {
        return res.status(403).json({ status: '403', message: 'Forbidden Request' });
    }
}

module.exports = authenticateToken;