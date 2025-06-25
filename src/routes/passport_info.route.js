import express from "express";
import * as passportController from "../controllers/passport_info.controller.js";
import { createPassportValidator } from "../validation/passport_info.validation.js";
import { validator } from "../helpers/validate.js";
import { isAuth } from "../guards/auth.guard.js"; 

const router = express.Router();

router.post("/", isAuth, validator(createPassportValidator), passportController.createPassport);
router.get("/", isAuth, passportController.getAllPassports);
router.get("/:id", isAuth, passportController.getPassportById);
router.put("/:id", isAuth, validator(createPassportValidator), passportController.updatePassport);
router.delete("/:id", isAuth, passportController.deletePassport);

export default router;
