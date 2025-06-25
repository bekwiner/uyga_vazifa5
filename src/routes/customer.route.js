import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";

const router = Router();

router.post("/signup", CustomerController.signup);
router.post("/login", CustomerController.login);

router.get("/me", CustomerController.me);
router.patch("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);

export default router;
