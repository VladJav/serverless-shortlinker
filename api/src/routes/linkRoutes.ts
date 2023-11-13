import { Router} from "express";
import {createLink, deactivateLink, getLinks} from "../controllers/linkController";

const router = Router();

router.delete('/:path', deactivateLink);
router.post('/', createLink);
router.get('/', getLinks);

export { router as linkRouter};