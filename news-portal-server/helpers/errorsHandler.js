module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.name === "Error") return res.status(400).json({ message: 'Image is required' });
    if (err.name === 'NotFound') return res.status(404).json({ message: "Error not found" });
    if (err.name === 'TypeError') return res.status(400).json({ message: 'Invalid input format' });
    if (err.name === "Unauthorized") return res.status(403).json({ message: "Unauthorized Forbidden Error" });
    if (err.name === "EmailIsRequired") return res.status(400).json({ message: "Email is required" });
    if (err.name === "Unauthenticated") return res.status(401).json({ message: "Error Authentication" });
    if (err.name === "JsonWebTokenError") return res.status(401).json({ message: "Error Authentication" });
    if (err.name === "PasswordIsRequired") return res.status(400).json({ message: "Password is required" });
    if (err.name === "InvalidEmailOrPassword") return res.status(401).json({ message: "Invalid email or password" });
    if (err.name === 'SequelizeValidationError') return res.status(400).json({ message: err.errors.filter(e => e.message).map(e => e.message) });
    if (err.name === "SequelizeUniqueConstraintError") return res.status(400).json({ message: err.errors.filter(e => e.message).map(e => e.message) });

    res.status(500).json({ message: "Internal Server Error." });
}