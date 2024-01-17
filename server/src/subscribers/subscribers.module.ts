import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SubscribersService, PrismaService]
})
export class SubscribersModule {}
