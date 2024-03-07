import { BaseEntity } from './base.entity.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IGenericRepository } from 'src/core/db/unitOfWork/repository.base';

@Injectable()
export abstract class BaseEntityService<T extends BaseEntity> {

    constructor(private baseRepository: IGenericRepository<T, T>) {
    }

    getAll() {
        return this.baseRepository.getAll();
    }

    async getById(id: number) {
        if (!(await this.baseRepository.exists(id)))
            throw new NotFoundException(`Wallet with id: ${id} not found.`);

        return this.baseRepository.get(id);
    }

    create(entity: T) {
        return this.baseRepository.create(entity);
    }

    update(id: number, updatedEntity: T) {
        this.baseRepository.update(id, updatedEntity);
    }

    delete(id: number) {
        this.baseRepository.delete(id);
    }
}
