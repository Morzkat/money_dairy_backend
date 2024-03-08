import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from 'src/core/db/unitOfWork/repositories/transactions.repository';
import { CategoriesRepository } from 'src/core/db/unitOfWork/repositories/categories.repository';
import { StatusRepository } from 'src/core/db/unitOfWork/repositories/status.repositories';
import { WalletsRepository } from 'src/core/db/unitOfWork/repositories/wallets.repository';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsRepository, WalletsRepository, CategoriesRepository, StatusRepository, TransactionsService],
})
export class TransactionsModule { }
