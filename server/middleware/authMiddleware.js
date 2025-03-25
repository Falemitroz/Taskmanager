const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("📩Token ricevuto:", token);
    if (!token) return res.status(401).json({ message: "Access Denied" });
    try {
        const verified = jwt.verify(token, "secret");
        req.user = verified;
        next();
    } catch (error) {
        console.error("🔴Errore nella richiesta:", error);
        res.status(400).json({ message: "Invalid Token" });
    }
};