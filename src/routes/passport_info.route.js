import express from "express";
import { passportInfoValidator } from "../validation/passport_info.validation.js";
import { validate } from "../helpers/validate.js";
import * as passportController from "../controllers/passport_info.controller.js";

const router = express.Router();

router.post("/", validate(passportInfoValidator), passportController.create);
router.get("/", passportController.getAll);
router.get("/:id", passportController.getById);
router.put("/:id", validate(passportInfoValidator), passportController.update);
router.delete("/:id", passportController.remove);

export default router;
