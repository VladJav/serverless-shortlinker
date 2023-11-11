import { Router} from "express";
import {showMe} from "../controllers/userController";

const router = Router();

router.get('/me', showMe);

export { router as userRouter };