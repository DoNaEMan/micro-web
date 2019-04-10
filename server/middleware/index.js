const middleware = async (ctx, next) => {
  return next();
}

module.exports = {
  order: 1,
  middleware,
}