import { desc, eq } from "drizzle-orm";
import { Inject, Injectable } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { BaseEntity } from "src/shared/base.entity.type";
import * as schemas from './../../../core/db/drizzle/schemas/schemas.index';
import { PG_CONNECTION } from "../drizzle/constants";

export abstract class IGenericRepository<T, X> {
    abstract getAll(): Promise<X[]>;

    abstract get(id: number): Promise<X>;

    abstract create(entity: T): Promise<X>;

    abstract update(id: number, entity: T);

    abstract delete(id: number);

    abstract exists(id: number): Promise<boolean>;
}

@Injectable()
export class GenericRepository<T, X extends BaseEntity> extends IGenericRepository<T, X> {

    constructor(@Inject(PG_CONNECTION) protected readonly db: PostgresJsDatabase<typeof schemas>, private readonly schema: string) {
        super();
    }

    getAll = async (): Promise<X[]> => {
        return this.db.query[this.schema]
            .findMany({
                orderBy: (entity) => desc(entity.id)
            });
    }

    get = async (id: number): Promise<X> =>
        this.db.query[this.schema]
            .findFirst({
                where: (entity) => eq(entity.id, id)
            });

    create(entity: T): Promise<X> {
        return this.db.insert(schemas[this.schema]).values({
            ...entity
        }).returning()
    }

    async update(id: number, entity: T) {
        if (!this.exists(id))
            throw new Error('Entity not found.');

        await this.db.update(schemas[this.schema])
            .set({ ...entity })
            .where(eq(schemas[this.schema].id, id));
    }

    async delete(id: number) {
        if (!this.exists(id))
            throw new Error('Entity not found.');

        await this.db.delete(schemas[this.schema])
            .where(eq(schemas[this.schema].id, id));
    }

    async exists(id: number): Promise<boolean> {
        const entity = await this.get(id);
        if (entity === null || entity === undefined)
            return false;

        return true;
    }
}