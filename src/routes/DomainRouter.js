import Express from "express";
import { checkDomainAvailability } from "../controller/DomainControler.js";

const router = Express.Router();

router.get("/", checkDomainAvailability);

export default router;
