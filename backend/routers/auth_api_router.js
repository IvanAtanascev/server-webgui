import express from "express";

const auth_api_router = express.Router();

auth_api_router.post("/login", (req, res) => {
    const { code } = req.body;
    if (code === process.env.AUTH_CODE) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

export default auth_api_router;
