import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TransactionsModule,
    WalletsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
