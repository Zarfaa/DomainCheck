import Express from "express";
import * as Controller from "../controller/DomainControler.js";

const router = Express.Router();

router.get("/", Controller.checkDomainAvailability);

export default router;
