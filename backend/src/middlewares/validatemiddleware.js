import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body:   req.body,
    params: req.params,
    query:  req.query,
  });

  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field:   e.path.join("."),
      message: e.message,
    }));
    return next(new ApiError(400, "Validation failed", errors));
  }

  // Replace req fields with Zod-parsed (sanitized) values
  if (result.data.body) req.body = result.data.body;
  if (result.data.params) Object.assign(req.params, result.data.params);
  if (result.data.query) Object.assign(req.query, result.data.query);
  next();
};