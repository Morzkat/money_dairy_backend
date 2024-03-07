import { Global, Module } from "@nestjs/common";
import { PG_CONNECTION } from "./constants";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as schemas from './schemas/schemas.index';

@Global()
@Module({
    providers: [{
        provide: PG_CONNECTION,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const connectionString = configService.get<string>('DATABASE_URL');
            const sql = postgres(connectionString);
            return drizzle(sql, { schema: schemas });
        }
    }],
    exports: [PG_CONNECTION]
})
export class DrizzleModule { }