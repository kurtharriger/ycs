import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ensureAdmin() {
  const adminEmail = process.env.ADMIN_USER;
  if (!adminEmail) {
    console.log('ADMIN_USER environment variable is not set - skipping admin role check');
    return;
  }

  try {
    // Find the admin user
    const adminUser = await prisma.appUser.findUnique({
      where: { email: adminEmail }
    });

    if (adminUser) {
      // Update existing admin user if needed
      if (adminUser.role !== 'ADMIN') {
        await prisma.appUser.update({
          where: { id: adminUser.id },
          data: { role: 'ADMIN' }
        });
        console.log(`Updated ${adminEmail} to ADMIN role`);
      } else {
        console.log(`${adminEmail} is already an ADMIN`);
      }
    } else {
      console.log(`Admin user ${adminEmail} not found. Please register first.`);
    }
  } catch (error) {
    console.error('Error ensuring admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}