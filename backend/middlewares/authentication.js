const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        console.log(`inside if ${token}`)
        res.status(401).json({ debug_msg: 'Please login' });
    }
    try {
        const decodedToken = jwt.verify(token, 'secret123');
        console.log(decodedToken);
        next();
    } catch (error) {
        console.log(`inside catch ${token}`)
        res.status(500).json({ debug_msg: 'Token sent is not valid' });
    }
};
