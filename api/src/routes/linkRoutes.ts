import { Router} from "express";
import {createLink, getLinks} from "../controllers/linkController";

const router = Router();

router.post('/', createLink);
router.get('/', getLinks);

export { router as linkRouter};