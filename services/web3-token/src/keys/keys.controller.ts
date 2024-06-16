import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';

@Controller()
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @MessagePattern('createKey')
  create(@Payload() createKeyDto: CreateKeyDto) {
    return this.keysService.create(createKeyDto);
  }

  @MessagePattern('findAllKeys')
  findAll() {
    return this.keysService.findAll();
  }

  @MessagePattern('findOneKey')
  findOne(@Payload() id: number) {
    return this.keysService.findOne(id);
  }

  @MessagePattern('updateKey')
  update(@Payload() updateKeyDto: UpdateKeyDto) {
    return this.keysService.update(updateKeyDto.id, updateKeyDto);
  }

  @MessagePattern('removeKey')
  remove(@Payload() id: number) {
    return this.keysService.remove(id);
  }
}
