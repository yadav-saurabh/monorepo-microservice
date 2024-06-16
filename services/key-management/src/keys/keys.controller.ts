import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Request } from 'express';

import { KafkaService } from 'src/kafka/kafka.service';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';

@Controller('keys')
export class KeysController {
  constructor(
    private readonly keysService: KeysService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  async create(@Req() req: Request, @Body() createKeyDto: CreateKeyDto) {
    if (!req.user.isAdmin) {
      throw new MethodNotAllowedException('Only admin users can create a key');
    }
    const keys = await this.keysService.create(createKeyDto);
    this.kafkaService.emitKeysCreated(keys);
    return keys;
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.keysService.findAll(req.user);
  }

  @Get(':key')
  findOne(@Req() req: Request, @Param('key') key: string) {
    return this.keysService.findOne(req.user, key);
  }

  @Patch(':key')
  async update(
    @Req() req: Request,
    @Param('key') key: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ) {
    if (Object.keys(updateKeyDto).length < 1) {
      throw new MethodNotAllowedException('nothing to update');
    }
    const keys = await this.keysService.update(req.user, key, updateKeyDto);
    if (keys) {
      this.kafkaService.emitKeysUpdated(keys);
    }
    return keys;
  }

  @Delete(':key')
  async remove(@Req() req: Request, @Param('key') key: string) {
    await this.keysService.remove(req.user, key);
    this.kafkaService.emitKeysDeleted({ key });
    return { message: 'success' };
  }
}
