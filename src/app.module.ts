import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';


@Module({
  imports: [TransactionsModule, WalletsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
