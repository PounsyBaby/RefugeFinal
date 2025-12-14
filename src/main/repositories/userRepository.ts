import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  login: async (email: string, passwordHash: string) => {
    // In a real app, you should hash the password before comparing
    // Here we assume the password sent is already hashed or we compare plain text for simplicity as per request
    // The DB has 'motdepasse_hash', so we check against that.
    
    const user = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (user && user.motdepasse_hash === passwordHash && user.actif) {
      // Return user without password
      const { motdepasse_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },
};
