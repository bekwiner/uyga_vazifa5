export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Faqat adminlar uchun" });
  }
  next();
};

export const isCustomer = (req, res, next) => {
  if (req.user?.role !== "customer") {
    return res.status(403).json({ message: "Faqat mijozlar uchun" });
  }
  next();
};
