export const validateSchema = (schema) => (req, res, next) => {
  try {
    const data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    next();
  } catch (error) {
    next(error);
  }
};
