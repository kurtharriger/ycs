/**
 * @file db.ts
 * @description Database client singleton for Prisma ORM
 *
 * @module Database
 */

import { PrismaClient } from '@prisma/client';

/**
 * Creates a singleton instance of PrismaClient
 * @returns {PrismaClient} Configured Prisma client instance
 *
 * @remarks
 * - Configures database URL from environment variables
 * - Enables query logging in development
 */
const prismaClientSingleton = () => {
  const dbUrl = process.env.DATABASE_URL;
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

/**
 * Global type augmentation for Prisma client
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

/**
 * Singleton instance of PrismaClient
 * @constant {PrismaClient}
 *
 * @remarks
 * - Maintains a single instance across the application
 * - Prevents multiple database connections
 * - Only stores in global scope during development
 */
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };