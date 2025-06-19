import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";

const r = Router();

r.post("/signup", AdminController.signup);
r.post("/login", AdminController.login);
r.get("/", AdminController.getAll);
r.get("/:id", AdminController.getById);
r.patch("/:id", AdminController.update);
r.delete("/:id", AdminController.delete);

export default r;
