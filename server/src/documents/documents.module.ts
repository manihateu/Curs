import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentsController } from './documents.controller';

@Module({
  providers: [DocumentsService, PrismaService],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
