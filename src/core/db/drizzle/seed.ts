import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schemas from './schemas/schemas.index';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

export const db = drizzle(sql, {
    schema: schemas
});

const seed = async () => {
    try {
        console.log('Seeding database...');

        await db.delete(schemas.transactions);
        await db.delete(schemas.wallets);
        await db.delete(schemas.categories);
        await db.delete(schemas.transactionStatus);

        await db.insert(schemas.transactionStatus).values([
            {
                name: 'Paid'
            },
            {
                name: 'Pending'
            }
        ]);

        await db.insert(schemas.categories).values([
            {
                name: 'Grocery'
            }
        ]);

        await db.insert(schemas.wallets).values([
            {
                name: 'Wallet 1',
                amount: '1500.50',
                createAt: new Date(),
                modifyAt: new Date(),
            },
            {
                name: 'Wallet 2',
                amount: '2500.50',
                createAt: new Date(),
                modifyAt: new Date(),
            },
            {
                name: 'Wallet 3',
                amount: '3500.50',
                createAt: new Date(),
                modifyAt: new Date(),
            }
        ]);
        const wallets = await db.select().from(schemas.wallets);
        const categories = await db.select().from(schemas.categories);
        const status = await db.select().from(schemas.transactionStatus);

        await db.insert(schemas.transactions).values([
            {
                category: categories[0].id,
                status: status[0].id,
                wallet: wallets[0].id,
                amount: '8.500',
            },
            {
                category: categories[0].id,
                status: status[1].id,
                wallet: wallets[1].id,
                amount: '3500.00',
            },
            {
                category: categories[0].id,
                status: status[0].id,
                wallet: wallets[2].id,
                amount: '500.00',
            }
        ]);

        console.log('Seeding completed');
        process.exit(0);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
}

seed();