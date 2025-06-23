import express from "express";
import path from "path";
import { promises as fs } from "fs";

const file_api_router = express.Router();

const BASE_DIR = path.resolve("user-files"); 

const safeJoin = (base, target) => {
    const resolved = path.resolve(base, target);
    if (!resolved.startsWith(base)) {
        throw new Error("Access denied");
    }
    return resolved;
};

file_api_router.post("/write_file", async (req, res) => {
    const { path: relativePath, content } = req.body;

    if (!relativePath) {
        return res.status(400).json({ error: "Missing file path" });
    }

    try {
        const fullPath = safeJoin(BASE_DIR, relativePath);
        await fs.writeFile(fullPath, content ?? "", "utf-8");
        res.status(200).json({ message: "File written successfully" });
    } catch (error) {
        res.status(400).json({
            error: `Couldn't write file: ${error.message}`,
        });
    }
});

file_api_router.post("/list_directory", async (req, res) => {
    const { path: relativePath } = req.body;

    if (!relativePath) {
        return res.status(400).json({ error: "Missing directory path" });
    }

    try {
        const dirPath = safeJoin(BASE_DIR, relativePath);
        const files = await fs.readdir(dirPath);
        res.status(200).json({
            message: "Directory read successfully",
            files,
        });
    } catch (error) {
        res.status(400).json({
            error: `Couldn't read directory: ${error.message}`,
        });
    }
});

file_api_router.post("/read_file", async (req, res) => {
    const { path: relativePath } = req.body;

    if (!relativePath) {
        return res.status(400).json({ error: "Missing file path" });
    }

    try {
        const fullPath = safeJoin(BASE_DIR, relativePath);
        const fileContents = await fs.readFile(fullPath, "utf-8");
        res.status(200).json({
            message: "File read successfully",
            fileContents,
        });
    } catch (error) {
        res.status(400).json({ error: `Couldn't read file: ${error.message}` });
    }
});

export default file_api_router;
