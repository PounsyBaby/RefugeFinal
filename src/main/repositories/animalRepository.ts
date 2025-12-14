import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to serialize data for IPC (handles BigInt, Decimal, Date)
const serialize = (data: any) => {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  }));
};

export const animalRepository = {
  getAnimals: async () => {
    const animals = await prisma.animal.findMany({
      include: {
        espece: true,
      },
      orderBy: {
        date_arrivee: 'desc',
      }
    });
    return serialize(animals);
  },

  createAnimal: async (data: any) => {
    // Sanitize microchip_no: convert empty string to null
    if (data.microchip_no === '') {
      data.microchip_no = null;
    }
    
    // Ensure poids_kg is a number or null (Prisma handles number -> Decimal)
    if (data.poids_kg === '') {
      data.poids_kg = null;
    }

    const animal = await prisma.animal.create({
      data,
    });
    return serialize(animal);
  },

  getAnimal: async (id: number) => {
    const animal = await prisma.animal.findUnique({
      where: { id_animal: id },
      include: { espece: true },
    });
    return serialize(animal);
  },

  updateAnimal: async (id: number, data: any) => {
    // Sanitize microchip_no: convert empty string to null
    if (data.microchip_no === '') {
      data.microchip_no = null;
    }
    if (data.poids_kg === '') {
      data.poids_kg = null;
    }

    const animal = await prisma.animal.update({
      where: { id_animal: id },
      data,
    });
    return serialize(animal);
  },

  deleteAnimal: async (id: number) => {
    const animal = await prisma.animal.delete({
      where: { id_animal: id },
    });
    return serialize(animal);
  },
  
  // Add other methods here
};
