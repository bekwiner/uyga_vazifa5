import { Router } from "express";
import { TransportController } from "../controllers/transport.controller.js";

const r = Router();

r.post("/", TransportController.create);
r.get("/", TransportController.getAll);
r.get("/:id", TransportController.getById);
r.patch("/:id", TransportController.update);
r.delete("/:id", TransportController.delete);

export default r;
