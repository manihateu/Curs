import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/entities/subscriber.entity';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  providers: [SubscriberService],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
