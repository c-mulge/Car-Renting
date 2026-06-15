import bcrypt from "bcryptjs";
import prisma from "../prisma/prismaClient.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
      },
    });

    res.status(201).json({
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const registerOwner = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Owner already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        role: "OWNER",
      },
    });

    res.status(201).json({
      id: owner.id,
      token: generateToken(owner.id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  res.json(req.user);
};
