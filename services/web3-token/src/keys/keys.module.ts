import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { Key } from './entities/key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Key])],
  controllers: [KeysController],
  providers: [KeysService],
})
export class KeysModule {}
