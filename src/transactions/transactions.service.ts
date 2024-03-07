import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction, Status, Category } from './transaction.type';

@Injectable()
export class TransactionsService {
    transactions: Array<Transaction>;

    constructor() {
        this.transactions = [
            {
                id: '',
                amount: 500,
                date: '02/21/2024',
                category: Category.Grocery,
                status: Status.Paid,
            },
        ];
    }

    //TODO: this method should recieve a date range because we do not want to return all transaction history...
    getAllTransactions() {
        return this.transactions;
    }

    getTransactionById(id: string) {
        const transaction = this.transactions.find((x) => x.id === id);
        if (transaction) {
            return transaction;
        }

        throw new NotFoundException(`Transaction with id: ${id} not found.`);
    }

    createTransaction(transaction: Transaction) {
        transaction.id = new Date().toISOString();
        this.transactions.push(transaction);

        return transaction;
    }

    updateTransaction(updatedTransaction: Transaction) {
        const transaction = this.getTransactionById(updatedTransaction.id);
        Object.assign(transaction, updatedTransaction);

        this.transactions = this.transactions.map((x) =>
            x.id === x.id ? transaction : x,
        );
        return transaction;
    }

    deleteTransaction(id: string) {
        this.transactions = this.transactions.filter((x) => x.id !== id);
    }
}
