export function requireRole(roles = []) {
  return (req, res, next) => {
    const role = req.header('x-role') || 'viewer';

    if (!roles.includes(role)) {
      return res.status(403).json({
        error: 'forbidden',
        message: `Role ${role} does not have access.`
      });
    }

    req.user = { role };
    next();
  };
}
