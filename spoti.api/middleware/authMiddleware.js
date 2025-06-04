import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'TU_SECRETO_SEGURIDAD';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado: token faltante o mal formado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ error: 'Token inválido: falta ID de usuario' });
    }

    req.user = decoded; // Esto hará que req.user.id esté disponible
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export default authMiddleware;