import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Document, IssueRecord } from '@prisma/client'
import { CreateDocumentDto } from './documents.dto';

@Injectable()
export class DocumentsService {
    constructor (private readonly prisma: PrismaService) {}

    // Метод для создания записи о документе
  async createDocument(data: CreateDocumentDto): Promise<Document> {
    return this.prisma.document.create({ data });
  }

  // Метод для получения информации о документах
  async getDocuments(): Promise<Document[]> {
    return this.prisma.document.findMany();
  }

  // Метод для обновления информации о документе
  async updateDocument(id: number, data: Partial<CreateDocumentDto>): Promise<Document> {
    return this.prisma.document.update({ where: { id }, data });
  }

  // Метод для выдачи документа абоненту
  async issueDocument(documentId: number, subscriberId: number): Promise<IssueRecord> {
    const issueDate = new Date();
    const issueRecord = await this.prisma.issueRecord.create({
      data: {
        issueDate,
        document: { connect: { id: documentId } },
        subscriber: { connect: { id: subscriberId } },
      },
    });

    // Уменьшаем количество доступных экземпляров документа
    await this.prisma.document.update({
      where: { id: documentId },
      data: { quantity: { decrement: 1 } },
    });

    return issueRecord;
  }

  // Метод для возврата документа
  async returnDocument(issueRecordId: number): Promise<void> {
    const issueRecord = await this.prisma.issueRecord.findUnique({
      where: { id: issueRecordId },
      include: { document: true },
    });

    if (issueRecord) {
      // Увеличиваем количество доступных экземпляров документа
      await this.prisma.document.update({
        where: { id: issueRecord.document.id },
        data: { quantity: { increment: 1 } },
      });

      // Удаляем запись о выдаче
      await this.prisma.issueRecord.delete({ where: { id: issueRecordId } });
    }
  }
}
