import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as dotenv from 'dotenv';
dotenv.config();

// for migrations
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(sql);

const runMigration = async () => {
    try {
        await migrate(db, {
            migrationsFolder: "src/core/db/drizzle/migrations",
        });

        console.log("Migration successful");
    } catch (error) {
        console.error('error: ', error);
        process.exit(1);
    }
};

runMigration();