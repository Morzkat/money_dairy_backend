import { BaseEntity } from 'src/shared/base.entity.type';

export type Wallet = BaseEntity & {
    name: string;
    amount: number;
};
