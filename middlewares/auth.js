const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1. Récupérer le token dans l'en-tête Authorization (Format: "Bearer TOKEN")
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        code: "red",
        message: "❌ Accès refusé. Token manquant."
      });
    }

    const token = authHeader.split(' ')[1];

    // 2. Vérifier le token avec ta clé secrète
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    
    // 3. Ajouter les infos de l'utilisateur décodé dans la requête pour les contrôleurs
    req.id = decodedToken.userId; 
    
    // 4. Passer au contrôleur suivant
    next();

  } catch (error) {
    return res.status(403).json({
      code: "red",
      message: "❌ Token invalide ou expiré.",
      error: error.message
    });
  }
};