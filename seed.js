const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Users
  const admin = await prisma.utilisateur.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      nom: 'Admin',
      prenom: 'Test',
      email: 'admin@test.com',
      motdepasse_hash: '123456',
      role: 'admin',
      actif: true,
    },
  });
  console.log('User created:', admin.email);

  // 2. Species
  const chien = await prisma.espece.upsert({
    where: { libelle: 'Chien' },
    update: {},
    create: { libelle: 'Chien' },
  });
  const chat = await prisma.espece.upsert({
    where: { libelle: 'Chat' },
    update: {},
    create: { libelle: 'Chat' },
  });
  console.log('Species created');

  // 3. Animals
  await prisma.animal.create({
    data: {
      nom_usuel: 'Rex',
      id_espece: chien.id_espece,
      sexe: 'M',
      date_naissance: new Date('2021-03-15'),
      date_arrivee: new Date('2024-09-01'),
      statut: 'adoptable',
      couleur_robe: 'marron',
      poids_kg: 22.50,
      sterilise: true,
      description: 'Chien dynamique mais très sociable.',
    },
  });

  await prisma.animal.create({
    data: {
      nom_usuel: 'Nala',
      id_espece: chat.id_espece,
      sexe: 'F',
      date_naissance: new Date('2022-02-02'),
      date_arrivee: new Date('2024-09-20'),
      statut: 'adoptable',
      couleur_robe: 'tigré',
      poids_kg: 4.20,
      sterilise: false,
      description: 'Chatte joueuse et curieuse.',
    },
  });
  console.log('Animals created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
