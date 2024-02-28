const jwt = require("jsonwebtoken");
const { User } = require("../db/database");

exports.isAuthenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.json({ message: "please login to continue", value: false });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
