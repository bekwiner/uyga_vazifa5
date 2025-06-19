import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller.js';

const r = Router();

r.post('/', TicketController.create);
r.get('/', TicketController.getAll);
r.get('/:id', TicketController.getById);
r.patch('/:id', TicketController.update);
r.delete('/:id', TicketController.delete);

export default r;
