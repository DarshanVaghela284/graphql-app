const Format = {
  error: (code, data, message) => ({
    code,
    data: data || null,
    message,
  }),
  success: (data, message) => {
    let response = { code: 200, data: data || null, message: message || "OK" };
    return response;
  },
  noContent: (data, message) => ({
    code: 204,
    data: data || null,
    message: message || "No Content Found",
  }),
  badRequest: (data, message) => ({
    code: 400,
    data: data || null,
    message: message || "Bad Request",
  }),
  unAuthorized: (data, message) => ({
    code: 401,
    data: data || null,
    message: message || "Unauthorized",
  }),
  forbidden: (data, message) => ({
    code: 403,
    data: data || null,
    message: message || "Unauthorized",
  }),
  notFound: (data, message) => ({
    code: 404,
    data: data || null,
    message: message || "Not found",
  }),
  conflict: (data, message) => ({
    code: 409,
    data: data || null,
    message: message || "Conflict",
  }),
  internalError: (error, message) => ({
    code: 500,
    data: null,
    error: `${error}`,
    message: message || "Internal Server Error",
  }),
  response: (code = 200, message) => ({
    code: code,
    message: message || "Ok",
  }),
  generateErrorObject: (param, message, location) => ({
    param,
    message,
    location,
  }),
};

export default Format;
