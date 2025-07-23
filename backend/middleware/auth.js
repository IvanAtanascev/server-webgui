const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${process.env.AUTH_CODE}`) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
};

export { authMiddleware };

