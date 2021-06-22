import express from "express";
import testapi from "../controllers/testapi.js";

import Login from "../controllers/Login.js";
import Signup from "../controllers/Signup.js";
const router = express.Router();
router.get("/", testapi);

router.post("/Signup", Signup);

router.post("/Login", Login);

export default router;
