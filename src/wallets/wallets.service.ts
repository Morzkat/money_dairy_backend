import { Wallet } from './wallet.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletsRepository } from 'src/core/db/unitOfWork/repositories/wallets.repository';
import { HttpExistsException } from 'src/core/exceptions/HttpExistsException';
import { BaseEntityService } from 'src/shared/base.service';
import { parseStringToFloat } from 'src/shared/utils/number.utils';
import { isNullOrUndefined } from 'src/shared/utils/object.utils';

@Injectable()
export class WalletsService extends BaseEntityService<Wallet> {

  constructor(private walletsRepository: WalletsRepository) {
    super(walletsRepository);
  }

  async getById(id: number) {
    if (!(await this.walletsRepository.exists(id)))
      throw new NotFoundException(`Wallet with id: ${id} not found.`);

    return this.walletsRepository.get(id);
  }

  create(entity: Wallet): Promise<Wallet> {
    if (!isNullOrUndefined(entity.id))
      throw new Error('Entity have a id, it should be a new entity.');

    this.validateWallet(entity);
    return super.create(entity);
  }

  update(id: number, updatedEntity: Wallet): void {
    this.validateWallet(updatedEntity);
    super.update(id, updatedEntity);
  }

  //INFO: method for validate wallet rules.
  private validateWallet(wallet: Wallet) {

    if (this.walletsRepository.existsWalletWithName(wallet.name))
      throw new HttpExistsException('A wallet with that name already exists, please use another name.');

    if (parseStringToFloat(wallet.amount) < 0) 
      throw new Error('The wallet amount cannot be less than 0');
  }
  
}
