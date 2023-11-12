import { Router} from "express";
import {createLink} from "../controllers/linkController";

const router = Router();

router.post('/', createLink);

export { router as linkRouter};