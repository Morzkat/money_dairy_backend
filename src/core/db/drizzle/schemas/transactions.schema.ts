import { } from 'drizzle-kit';
import { wallets } from './wallets.schema';
import {
    integer,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const transactionStatus = pgTable('transaction_status', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
});

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
});

export const transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    amount: numeric('amount').default('0.00'),
    wallet: integer('wallet_id')
        .notNull()
        .references(() => wallets.id),
    status: integer('transaction_status_id')
        .notNull()
        .references(() => transactionStatus.id),
    category: integer('category_id')
        .notNull()
        .references(() => categories.id),
    createAt: timestamp('create_at').notNull().defaultNow(),
    modifyAt: timestamp('modify_at').notNull().defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
	wallet: one(wallets, { fields: [transactions.wallet], references: [wallets.id] }),
	category: one(categories, { fields: [transactions.category], references: [categories.id] }),
	status: one(transactionStatus, { fields: [transactions.status], references: [transactionStatus.id] }),
}));
