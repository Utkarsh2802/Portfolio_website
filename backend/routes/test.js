import express from "express";
import testapi from "../controllers/testapi.js";

import create_user from "../controllers/create_user.js";
import login from "../controllers/login.js";
const router = express.Router();
router.get("/", testapi);

router.post("/create_user", create_user);

router.get("/Login", login);

export default router;
