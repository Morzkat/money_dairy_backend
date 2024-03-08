import { BaseEntity } from "src/shared/base.entity.type";
import { Wallet } from "src/wallets/wallet.type";

export enum Status {
    Paid = 'Paid',
}

export type StatusToInsertOrUpdate = BaseEntity & {
    name: string,
}

export enum Category {
    Grocery = 'Grocery',
}

export type CategoryToInsertOrUpdate = BaseEntity & {
    name: string,
}

//TODO: Create a smaller type with only amount and
export type Transaction = BaseEntity & {
    amount: string;
    wallet: Wallet,
    createAt: Date;
    modifyAt: Date;
    status: Status | string;
    category: Category | string;
};

// Add validator...
export type TransactionToInsertOrUpdate = {
    category: string,
    status: string
    wallet: number,
    amount: string,
}