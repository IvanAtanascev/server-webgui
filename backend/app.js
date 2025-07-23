import express from "express";
import file_api_router from "./routers/file_api_router.js";
import auth_api_router from "./routers/auth_api_router.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use("/api/auth", auth_api_router);
app.use("/api/files", file_api_router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
