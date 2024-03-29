import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScammersController } from './scammers.controller';
import { Scammer, ScammerSchema } from './scammers.schema';
import { ScammersService } from './scammers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Scammer.name, schema: ScammerSchema }])],
  controllers: [ScammersController],
  providers: [ScammersService],
})
export class ScammersModule {}
