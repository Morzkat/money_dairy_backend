import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction, TransactionToInsertOrUpdate } from './transaction.type';
import { TransactionsRepository } from 'src/core/db/unitOfWork/repositories/transactions.repository';
import { StatusRepository } from 'src/core/db/unitOfWork/repositories/status.repositories';
import { CategoriesRepository } from 'src/core/db/unitOfWork/repositories/categories.repository';
import { WalletsRepository } from 'src/core/db/unitOfWork/repositories/wallets.repository';
import { parseStringToFloat } from 'src/shared/utils/number.utils';

@Injectable()
export class TransactionsService {
    transactions: Array<Transaction>;

    constructor(private transactionRepository: TransactionsRepository, private walletRepository: WalletsRepository,
        private categoriesRepository: CategoriesRepository, private statusRepository: StatusRepository) {
    }

    //TODO: this method should recieve a date range because we do not want to return all transaction history...
    async getAllTransactions(): Promise<Transaction[]> {
        return this.transactionRepository.getAll();
    }

    async getTransactionById(id: number) {
        if (!(await this.transactionRepository.exists(id)))
            throw new NotFoundException(`Transaction with id: ${id} not found.`);

        return this.transactionRepository.get(id);
    }

    async createTransaction(transaction: TransactionToInsertOrUpdate) {
        this.validateTransaction(transaction);
        const wallet = await this.walletRepository.get(transaction.wallet);
        wallet.amount = `${parseStringToFloat(wallet.amount) - parseStringToFloat(transaction.amount)}`;

        await this.walletRepository.update(wallet.id, wallet);
        return this.transactionRepository.create(transaction);
    }

    async updateTransaction(transactionId: number, transactiontoUpdate: TransactionToInsertOrUpdate) {

        this.validateTransaction(transactiontoUpdate);

        transactiontoUpdate.status = (await this.statusRepository.getStatusByName(transactiontoUpdate.status))?.id.toString();
        transactiontoUpdate.category = (await this.categoriesRepository.getCategoryByName(transactiontoUpdate.category))?.id.toString();;

        const currentTransaction = await this.transactionRepository.get(transactionId);
        const wallet = await this.walletRepository.get(currentTransaction.wallet.id);
        wallet.amount = `${parseStringToFloat(wallet.amount) + (parseStringToFloat(currentTransaction.amount) - parseStringToFloat(transactiontoUpdate.amount))}`;

        await this.walletRepository.update(wallet.id, wallet);
        await this.transactionRepository.update(transactionId, transactiontoUpdate);
    }

    async deleteTransaction(id: number) {
        //TODO: Update wallet balance
        this.transactionRepository.delete(id);
    }

    private validateTransaction(transaction: Transaction | TransactionToInsertOrUpdate) {
        if (parseStringToFloat(transaction.amount) < 0)
            throw new Error('The wallet amount cannot be less than 0');
    }
}
