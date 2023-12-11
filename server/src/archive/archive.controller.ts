import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { CreateArchiveDto } from './archive.dto';

@Controller('archives')
export class ArchiveController {
    constructor(private readonly archiveService: ArchiveService) {}

    @Post('/create')
    async createArchive(@Body() createArchiveDto: CreateArchiveDto) {
        return await this.archiveService.createArchiveRecord(createArchiveDto);
    }

    @Get()
    async getAll() {
        return await this.archiveService.getAllArchiveRecords()
    }
    @Get('/:cellCode')
    async getByCell(@Param('cellCode') cellCode: string) {
        return await this.archiveService.getArchiveRecordByCellCode(cellCode)
    }

    @Post('/update/:cellCode')
    async update(@Body() data: Partial<CreateArchiveDto>, @Param('cellCode') cellCode: string) {
        return await this.archiveService.updateArchiveRecord(cellCode, data)
    }

    @Delete('/:cellCode')
    async delete(@Param('cellCode') cellCode: string) {
        return await this.archiveService.deleteArchiveRecord(cellCode)
    }
}
