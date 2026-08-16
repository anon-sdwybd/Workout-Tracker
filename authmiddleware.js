const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({
            message: "No Token Provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_secret);

        req.user = user;

        next();

    }catch(err){
        return res.json(403).json({
            message: "Invalid or Expired Token"
        });
    }
}

module.exports = authenticateToken;