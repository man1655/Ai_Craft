  import jwt from "jsonwebtoken";

  const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.id) {
        return res.status(401).json({
          success: false,
          message: "Invalid token. Login again!",
        });
      }

      // ✅ Use req.user instead of req.body
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed: " + error.message,
      });
    }
  };

  export default userAuth;
