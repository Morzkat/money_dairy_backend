import { Inject, Injectable } from "@nestjs/common";
import { GenericRepository } from "../repository.base";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { PG_CONNECTION } from "../../drizzle/constants";
import * as schemas from './../../../../core/db/drizzle/schemas/schemas.index';
import { Status, StatusToInsertOrUpdate } from "src/transactions/transaction.type";

@Injectable()
export class StatusRepository extends GenericRepository<Status, StatusToInsertOrUpdate> {

    constructor(@Inject(PG_CONNECTION) protected readonly db: PostgresJsDatabase<typeof schemas>) {
        super(db, 'transactionStatus');
    }

    async getStatusByName(name: string): Promise<StatusToInsertOrUpdate> {
        return this.db.query.transactionStatus.findFirst({
            where: (status, { eq, sql }) => eq(sql`lower(${status.name})`, name.toLowerCase())
        });
    }
}