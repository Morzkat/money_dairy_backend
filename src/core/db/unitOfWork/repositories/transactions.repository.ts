import { desc, eq, sql } from "drizzle-orm";
import { Inject, Injectable } from "@nestjs/common";
import { GenericRepository } from "../repository.base";
import { PG_CONNECTION } from "../../drizzle/constants";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Transaction, TransactionToInsertOrUpdate } from "src/transactions/transaction.type";
import * as schemas from './../../../../core/db/drizzle/schemas/schemas.index';

@Injectable()
export class TransactionsRepository extends GenericRepository<TransactionToInsertOrUpdate, Transaction> {

    constructor(@Inject(PG_CONNECTION) protected readonly db: PostgresJsDatabase<typeof schemas>) {
        super(db, 'transactions');
    }

    getAll = async (): Promise<Transaction[]> => {
        return this.db
            .select({
                id: schemas.transactions.id,
                amount: schemas.transactions.amount,
                wallet: schemas.wallets,
                status: schemas.transactionStatus.name,
                category: schemas.categories.name,
                createAt: schemas.transactions.createAt,
                modifyAt: schemas.transactions.modifyAt
            })
            .from(schemas.transactions)
            .innerJoin(schemas.wallets, eq(schemas.wallets.id, schemas.transactions.wallet))
            .innerJoin(schemas.transactionStatus, eq(schemas.transactionStatus.id, schemas.transactions.status))
            .innerJoin(schemas.categories, eq(schemas.categories.id, schemas.transactions.category))
            .orderBy(desc(schemas.transactions.id));
    }

    get = async (id: number): Promise<Transaction> => {
        const p = (await this.db
            .select({
                id: schemas.transactions.id,
                amount: schemas.transactions.amount,
                wallet: schemas.wallets,
                status: schemas.transactionStatus.name,
                category: schemas.categories.name,
                createAt: schemas.transactions.createAt,
                modifyAt: schemas.transactions.modifyAt
            })
            .from(schemas.transactions)
            .innerJoin(schemas.wallets, eq(schemas.wallets.id, schemas.transactions.wallet))
            .innerJoin(schemas.transactionStatus, eq(schemas.transactionStatus.id, schemas.transactions.status))
            .innerJoin(schemas.categories, eq(schemas.categories.id, schemas.transactions.category))
            .where(eq(schemas.transactions.id, id))
            .orderBy(desc(schemas.transactions.id))
            .limit(1))[0];

        return p;
    }

    async create(entity: TransactionToInsertOrUpdate): Promise<Transaction> {
        entity.status = `${(await this.db.query.transactionStatus
            .findFirst({
                where: (status) => eq(sql`lower(${status.name})`, entity.status.toLowerCase())
            })).id}`;

        entity.category = `${(await this.db.query.categories
            .findFirst({
                where: (category) => eq(sql`lower(${category.name})`, entity.category.toLowerCase())
            })).id}`;

        return super.create(entity);
    }
}