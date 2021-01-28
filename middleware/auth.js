const jwt = require("jsonwebtoken");
const { privateKey } = require("../token");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
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