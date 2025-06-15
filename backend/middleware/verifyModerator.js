const verifyModerator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  if (!req.user.esModerador) {
    return res.status(403).json({ error: 'No autorizado. Solo moderadores.' });
  }
  next();
};

module.exports = verifyModerator;
