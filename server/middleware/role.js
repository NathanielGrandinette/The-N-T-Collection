const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    try {
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).send({ error: "Unauthorized" });
      }
    } catch (error) {
      return res.status(401).send("Unathorized");
    }
    next();
  };
};

module.exports = verifyRole;
