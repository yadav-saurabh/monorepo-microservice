import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Request } from 'express';

import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { Key } from './entities/key.entity';

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
  ) {}

  create(createKeyDto: CreateKeyDto) {
    const entity = this.keyRepository.create(createKeyDto);
    return this.keyRepository.save(entity);
  }

  findAll(user: Request['user']) {
    if (user.isAdmin) {
      return this.keyRepository.find();
    }
    return this.keyRepository.find({ where: { userId: user.id } });
  }

  findOne(user: Request['user'], key: string) {
    if (user.isAdmin) {
      return this.keyRepository.findOneBy({ key });
    }
    return this.keyRepository.findOneBy({ key, userId: user.id });
  }

  async update(
    user: Request['user'],
    key: string,
    data: UpdateKeyDto,
  ): Promise<Key> {
    const condition: FindOptionsWhere<Key> = { key };
    if (!user.isAdmin) {
      condition.userId = user.id;
      if (data.userId) {
        throw new MethodNotAllowedException('cannot update userId');
      }
    }
    const keyData = await this.keyRepository.findOneBy(condition);
    if (!keyData) {
      throw new NotFoundException('Key Not Found');
    }
    return this.keyRepository.save({ ...keyData, ...data });
  }

  remove(user: Request['user'], key: string) {
    if (user.isAdmin) {
      return this.keyRepository.delete({ key });
    }
    return this.keyRepository.delete({ key, userId: user.id });
  }
}
