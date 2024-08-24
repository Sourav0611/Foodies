import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Check for the token in the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Token verification failed. Please login again." });
    }
};

export default authMiddleware;
