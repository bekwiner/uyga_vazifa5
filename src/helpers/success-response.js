export const successRes = (res, data, code = 200) => {
  return res.status(code).json({
    statusCode: code,
    message: "success",
    data,
  });
};
