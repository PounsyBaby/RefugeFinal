import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to serialize data for IPC
const serialize = (data: any) => {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  }));
};

export const especeRepository = {
  getAll: async () => {
    const especes = await prisma.espece.findMany();
    return serialize(especes);
  },
};
