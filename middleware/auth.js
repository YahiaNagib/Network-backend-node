const jwt = require("jsonwebtoken");
const { privateKey } = require("../token");

// This middleware function is used to check th jwt and decode it and pass it to the req of the route
function auth(req, res, next) {
    const token = req.header("x-auth-token");
    // Authorization is required in certain routes
    if (!token) return res.status(401).send("Access denied!");
    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(400).send("Invalid token");
    }
}

module.exports = auth;