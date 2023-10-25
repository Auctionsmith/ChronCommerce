const protectedRoute = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  return res.status(400).send('Not Authenticated');
};

module.exports = protectedRoute;