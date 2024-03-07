import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletsRepository } from 'src/core/db/unitOfWork/repositories/wallets.repository';

@Module({
  controllers: [WalletsController],
  providers: [WalletsRepository, WalletsService],
})
export class WalletsModule { }
