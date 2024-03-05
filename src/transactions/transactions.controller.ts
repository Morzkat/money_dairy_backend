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
import { Transaction } from './transaction.type';
import { Response } from './../core/entities/response.type';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) { }

  @Get()
  getTransactions() {
    return new Response<Array<Transaction>>(
      'All transactions of this month',
      this.transactionService.getAllTransactions(),
    );
  }

  @Get()
  getTransactionById(@Param() transactionId: string) {
    return new Response<Transaction>(
      'Transaction details',
      this.transactionService.getTransactionById(transactionId),
    );
  }

  @Post()
  createTransaction(@Body() transaction: Transaction) {
    return new Response<Transaction>(
      'Create new transaction',
      this.transactionService.createTransaction(transaction),
    );
  }

  @Put()
  updateTransaction(@Body() transaction: Transaction) {
    return new Response<Transaction>(
      'Create new transaction',
      this.transactionService.updateTransaction(transaction),
    );
  }

  @Delete()
  deleteTransaction(@Body() transactionId: string) {
    return new Response<void>(
      'Create new transaction',
      this.transactionService.deleteTransaction(transactionId),
    );
  }
}
