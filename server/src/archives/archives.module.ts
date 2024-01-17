import { Module } from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArchivesController } from './archives.controller';

@Module({
  providers: [ArchivesService, PrismaService],
  controllers: [ArchivesController]
})
export class ArchivesModule {}
