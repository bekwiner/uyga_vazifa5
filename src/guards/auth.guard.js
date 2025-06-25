import jwt from "jsonwebtoken";
import { handleError } from "../helpers/error-response.js";

export const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token yo‘q" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    handleError(res, err, 401, "Token noto‘g‘ri yoki eskirgan");
  }
};
