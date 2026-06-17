import prisma from "../prisma/prismaClient.js";

const createNotification = async (userId, title, message) => {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });
};

export default createNotification;
