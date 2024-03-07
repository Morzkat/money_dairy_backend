import { Wallet } from './wallet.type';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from 'src/shared/base.service';

@Injectable()
export class WalletsService extends BaseEntityService<Wallet> {
  entities: Wallet[];

  constructor() {
    super();
  }
}
