import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const dbUrl = process.env.DATABASE_URL;
  console.log('Database URL:', dbUrl ? `${dbUrl.split('@')[0]}@${dbUrl.split('@')[1].split('/')[0]}/...` : 'Not set');

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };