exports.showError = (error, res, json = true) => {
  const errors = {};
  const Errors = error.errors.map((err) => {
    !errors[err.param] ? (errors[err.param] = err.msg) : null;
  });
  return res.status(422).json({
    error: errors,
  });
};
