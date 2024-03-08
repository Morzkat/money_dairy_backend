import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionToInsertOrUpdate } from './transaction.type';
import { Response } from './../core/entities/response.type';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) { }

  @Get()
  async getTransactions() {
    return new Response<Array<Transaction>>(
      'All transactions of this month',
      await this.transactionService.getAllTransactions(),
    );
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: number) {
    return new Response<Transaction>(
      'Transaction details',
      await this.transactionService.getTransactionById(id),
    );
  }

  @Post()
  async createTransaction(@Body() transaction: TransactionToInsertOrUpdate) {
    return new Response<Transaction>(
      'New transaction created',
      await this.transactionService.createTransaction(transaction),
    );
  }

  @Put(':id')
  async updateTransaction(@Body() transaction: TransactionToInsertOrUpdate, @Param('id') id: number) {
    return new Response<void>(
      'Transaction updated',
      await this.transactionService.updateTransaction(id, transaction),
    );
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: number) {
    return new Response<void>(
      'Transaction deleted',
      await this.transactionService.deleteTransaction(id),
    );
  }
}
