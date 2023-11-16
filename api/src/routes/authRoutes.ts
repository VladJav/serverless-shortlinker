import { Router} from "express";
import {activateUser, loginUser, registerUser} from "../controllers/authController";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/activate/:token', activateUser);

export { router as authRouter};