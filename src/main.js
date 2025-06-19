import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import adminRouter from "./routes/admin.route.js";
import customerRouter from "./routes/customer.route.js";
import transportRouter from "./routes/transport.route.js";
import ticketRouter from "./routes/ticket.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
await connectDB();

app.use("/admin", adminRouter);
app.use("/customer", customerRouter);
app.use("/transport", transportRouter);
app.use("/ticket", ticketRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
