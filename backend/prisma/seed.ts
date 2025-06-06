import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');

async function main() {
    console.log('[🌱] Starting seed...');

    await prisma.user.deleteMany();
    console.log('Cleared existing users');

    const adminUser = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('123', saltRounds),
            email: 'admin@example.com',
        },
    });

    const testUser = await prisma.user.create({
        data: {
            username: 'test',
            password: await bcrypt.hash('123', saltRounds),
            email: 'test@example.com',
        },
    });

    console.log('Created users:', {
        admin: adminUser,
        testuser: testUser,
    });

    console.log('[🌱] Seed completed successfully!');
}

main()
    .catch(e => {
        console.error('Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
