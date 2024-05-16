import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from 'src/entities/subscriber.entity';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { TokenService } from 'src/token/token.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber]), TokenModule],
  providers: [SubscriberService, TokenService],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
