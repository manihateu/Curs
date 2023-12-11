import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archive } from './entities/archive.entity';
import { ArchiveService } from './archive/archive.service';
import { ArchiveController } from './archive/archive.controller';
import { Subscriber } from './entities/subscriber.entity';
import { SubscriberService } from './subscriber/subscriber.service';
import { SubscriberController } from './subscriber/subscriber.controller';
import { Document } from './entities/document.entity';
import { DocumentService } from './document/document.service';
import { DocumentController } from './document/document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Archive, Subscriber, Document])],
  providers: [ArchiveService, SubscriberService, DocumentService],
  controllers: [ArchiveController, SubscriberController, DocumentController],
})
export class ArchiveModule {}