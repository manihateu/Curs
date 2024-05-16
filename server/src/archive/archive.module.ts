import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archive } from '../entities/archive.entity';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';


@Module({
  imports: [TypeOrmModule.forFeature([Archive]), TokenModule],
  providers: [ArchiveService, TokenService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}