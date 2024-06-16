import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.keyRepository.find();
  }

  findOne(id: number) {
    return this.keyRepository.findOneBy({ id: id });
  }

  update(id: number, data: UpdateKeyDto) {
    return this.keyRepository.update({ id }, { ...data });
  }

  remove(id: number) {
    return this.keyRepository.delete(id);
  }
}
