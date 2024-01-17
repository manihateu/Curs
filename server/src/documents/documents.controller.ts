import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './documents.dto';

@Controller('documents')
export class DocumentsController {
    constructor (private readonly documentsService: DocumentsService) {}

    @Post()
    async create (@Body() dto: CreateDocumentDto) {
        return await this.documentsService.createDocument(dto)
    }

    @Put('/:id')
    async update (@Param('id') id: number, dto: Partial<CreateDocumentDto>) {
        return await this.documentsService.updateDocument(id, dto)
    }

    @Post('return/:issueRecordId')
    async return (@Param('issueRecordId') issueRecordId: number) {
        return await this.documentsService.returnDocument(issueRecordId)
    }

    @Post("issue")
    async issue (@Body() dto: {documentId: number, subscriberId: number}) {
        return await this.documentsService.issueDocument(dto.documentId, dto.subscriberId)
    }
}
