import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schemas from './schemas/schemas.index';

const sql = postgres(process.env.DATABASE_URL);

export const db = drizzle(sql, {
    schema: schemas
});