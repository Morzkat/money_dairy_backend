import { Inject, Injectable } from "@nestjs/common";
import { GenericRepository } from "../repository.base";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { PG_CONNECTION } from "../../drizzle/constants";
import * as schemas from './../../../../core/db/drizzle/schemas/schemas.index';
import { Category, CategoryToInsertOrUpdate } from "src/transactions/transaction.type";

@Injectable()
export class CategoriesRepository extends GenericRepository<Category, CategoryToInsertOrUpdate> {

    constructor(@Inject(PG_CONNECTION) protected readonly db: PostgresJsDatabase<typeof schemas>) {
        super(db, 'categories');
    }

    async getCategoryByName(name: string): Promise<CategoryToInsertOrUpdate> {
        return this.db.query.categories.findFirst({
            where: (category, { eq, sql }) => eq(sql`lower(${category.name})`, name.toLowerCase())
        });
    }
}