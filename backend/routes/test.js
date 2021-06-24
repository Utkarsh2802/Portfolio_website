import express from "express";
import testapi from "../controllers/testapi.js";
import CheckAuth from "../controllers/CheckAuth.js";
import Login from "../controllers/Login.js";
import Signup from "../controllers/Signup.js";
import Logout from "../controllers/Logout.js";
const router = express.Router();
router.get("/Test", testapi);

router.post("/Signup", Signup);

router.post("/Login", Login);
router.get("/CheckAuth", CheckAuth);
router.post("/Logout", Logout);

export default router;
