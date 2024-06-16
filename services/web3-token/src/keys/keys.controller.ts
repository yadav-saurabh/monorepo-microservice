import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { EVENTS } from '@nestjs-microservices/events';

@Controller()
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @MessagePattern(EVENTS.KEYS.CREATED)
  create(@Payload() createKeyDto: CreateKeyDto) {
    return this.keysService.create(createKeyDto);
  }

  @MessagePattern(EVENTS.KEYS.UPDATED)
  update(@Payload() updateKeyDto: UpdateKeyDto) {
    return this.keysService.update(updateKeyDto.key, updateKeyDto);
  }

  @MessagePattern(EVENTS.KEYS.DELETED)
  remove(@Payload() key: string) {
    return this.keysService.remove(key);
  }
}
