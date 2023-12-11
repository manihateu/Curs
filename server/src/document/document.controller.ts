import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './document.dto';

@Controller('documents')
export class DocumentController {
    constructor (private readonly documentService: DocumentService) {}

    @Post('/create')
    async createDocument(@Body() dto: CreateDocumentDto) {
        return await this.documentService.createDocument(dto)
    }

    @Get()
    async getAll() {
        return await this.documentService.getAllDocuments()
    }

    @Get('/:invetoryNumber')
    async getByInventoryNumber(@Param('invetoryNumber') invetoryNumber: string) {
        return await this.documentService.getDocumentByInventoryNumber(invetoryNumber)
    }

    @Post('/update/:invetoryNumber')
    async updateDocument(@Param('invetoryNumber') inventoryNumber: string, @Body() data: Partial<CreateDocumentDto>) {
        return await this.documentService.updateDocument(inventoryNumber, data)
    }

    @Delete('/:invetoryNumber')
    async delete(@Param('invetoryNumber') invetoryNumber: string) {
        return await this.documentService.deleteDocument(invetoryNumber)
    }
}
