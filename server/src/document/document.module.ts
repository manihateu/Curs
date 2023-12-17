import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Subscriber } from 'src/entities/subscriber.entity';
import { Archive } from 'src/entities/archive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Subscriber, Archive])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
