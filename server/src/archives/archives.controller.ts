// Файл: archives.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { Archive } from '@prisma/client';
import { CreateArchiveDto } from './archive.dto';

@Controller('archives')
export class ArchivesController {
  constructor(private readonly archiveService: ArchivesService) {}

  @Post()
  async create(@Body() data: CreateArchiveDto): Promise<Archive> {
    return await this.archiveService.createArchiveRecord(data);
  }

  @Get()
  async findAll(): Promise<Archive[]> {
    return await this.archiveService.getArchives();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateArchiveDto>): Promise<Archive> {
    return await this.archiveService.updateArchiveRecord(+id, data);
  }

  @Get("/document/:id")
  async getDocumentsInArchive (@Param('id') id: string) {
    return await this.archiveService.getDocumentsInArchive(+id)
  }
}
