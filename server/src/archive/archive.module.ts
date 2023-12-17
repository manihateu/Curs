import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archive } from '../entities/archive.entity';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Archive])],
  providers: [ArchiveService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}