import Express from "express";
import { checkDomainAvailability } from "../controllers/domainController.js";

const router = Express.Router();

router.get("/", checkDomainAvailability);

export default router;
