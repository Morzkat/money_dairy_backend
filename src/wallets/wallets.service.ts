import { Wallet } from './wallet.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletsRepository } from 'src/core/db/unitOfWork/repositories/wallets.repository';
import { BaseEntityService } from 'src/shared/base.service';

@Injectable()
export class WalletsService extends BaseEntityService<Wallet> {

  constructor(private walletsRepository: WalletsRepository) {
    super(walletsRepository);
  }

  async getById(id: number) {
    if (!this.walletsRepository.exists(id))
      throw new NotFoundException(`Wallet with id: ${id} not found.`);

    return this.walletsRepository.get(id);
  }
}
