import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Proper check
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token or wrong format" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secret");
    req.user = decoded;

    next();
  } catch (err) {
    console.log("TOKEN ERROR:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default auth;