import { numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const wallets = pgTable('wallets', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
    amount: numeric('amount').default('0.00'),
    createAt: timestamp('create_at').notNull().defaultNow(),
    modifyAt: timestamp('modify_at').notNull().defaultNow(),
});
