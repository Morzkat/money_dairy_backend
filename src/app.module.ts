import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';
import { DrizzleModule } from './core/db/drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),

    DrizzleModule,
    TransactionsModule,
    WalletsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
