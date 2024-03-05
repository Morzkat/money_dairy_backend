import { BaseEntity } from './base.entity.type';
import { nameOf } from './../shared/object.utils';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export abstract class BaseEntityService<T extends BaseEntity> {
    entities: Array<T>;

    constructor() {
        this.entities = new Array<T>();
    }

    //TODO: this method should recieve a date range because we do not want to return all entity history...
    getAll() {
        return this.entities;
    }

    getById(id: string) {
        const entity = this.entities.find((x) => x.id === id);
        if (entity) {
            return entity;
        }

        console.log(`${nameOf(entity)} with id: ${id} not found.`);
        throw new NotFoundException(`${typeof entity} with id: ${id} not found.`);
    }

    create(entity: T) {
        entity.id = new Date().toISOString();
        this.entities.push(entity);

        return entity;
    }

    update(updatedEntity: T) {
        const entity = this.getById(updatedEntity.id);
        Object.assign(entity, updatedEntity);

        this.entities = this.entities.map((x) => (x.id === x.id ? entity : x));
        return entity;
    }

    delete(id: string) {
        this.entities = this.entities.filter((x) => x.id !== id);
    }
}
