import express from "express";
import file_api_router from "./routers/file_api_router.js";

const app = express();
app.use(express.json());
app.use("/api/files", file_api_router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
