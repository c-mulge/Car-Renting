import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      if (user.isBlocked) {
        return res.status(403).json({
          message: "Account blocked by admin",
        });
      }

      req.user = user;

      next();
    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Token invalid",
    });
  }
};

export default protect;
