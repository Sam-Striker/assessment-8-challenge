export const protect = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated!", success: false });
    }

    req.token = token;
    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Not authorized! invalid token", success: false });
  }
};

