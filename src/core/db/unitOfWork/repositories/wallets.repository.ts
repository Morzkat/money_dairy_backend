import { Inject, Injectable } from "@nestjs/common";
import { GenericRepository } from "../repository.base";
import { Wallet } from "src/wallets/wallet.type";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { PG_CONNECTION } from "../../drizzle/constants";
import * as schemas from './../../../../core/db/drizzle/schemas/schemas.index';

@Injectable()
export class WalletsRepository extends GenericRepository<Wallet, Wallet> {

    constructor(@Inject(PG_CONNECTION) protected readonly db: PostgresJsDatabase<typeof schemas>) {
        super(db, 'wallets');
    }

    async existsWalletWithName(name: string): Promise<boolean> {
        const wallet = await this.db.query.wallets.findFirst({
            where: (wallet, { eq }) => eq(wallet.name, name)
        });

        if (wallet === null || wallet === undefined)
            return false;

        return true;
    }
}