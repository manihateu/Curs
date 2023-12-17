import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { CreateDocumentDto } from './document.dto';
import { Archive } from 'src/entities/archive.entity';
import { Subscriber } from 'src/entities/subscriber.entity';


@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Archive)
    private archiveRepository: Repository<Archive>,
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
  ) {}

  async createDocument(dto: CreateDocumentDto): Promise<CreateDocumentDto> {
    const selectedArchive: Archive = await this.archiveRepository.findOne({where: {id: dto.archiveId}})
    const selectedSubscriber: Subscriber = await this.subscriberRepository.findOne({where: {id: dto.subscriberId}})
    const {name,
      theme,
      inventoryNumber,
      cellCode,
      quantity,
      entryDate } = dto
    if (selectedArchive && selectedSubscriber) {
      const documentRecord: Document = this.documentRepository.create({
        name,
        theme, 
        inventoryNumber,
        cellCode,
        quantity,
        entryDate,
        subscriber: selectedSubscriber,
        archive: selectedArchive
      });
      return this.documentRepository.save<any>(documentRecord);
    }
  }

  async getAllDocuments(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async getDocumentByInventoryNumber(inventoryNumber: string): Promise<Document> {
    const document = await this.documentRepository.findOne({ where: { inventoryNumber } });
    if (!document) {
      throw new NotFoundException(`Document with inventory number ${inventoryNumber} not found`);
    }
    return document;
  }

  async updateDocument(inventoryNumber: string, updateData: Partial<Document>): Promise<Document> {
    const document = await this.getDocumentByInventoryNumber(inventoryNumber);
    this.documentRepository.merge(document, updateData);
    return this.documentRepository.save(document);
  }

  async deleteDocument(inventoryNumber: string): Promise<void> {
    const document = await this.getDocumentByInventoryNumber(inventoryNumber);
    await this.documentRepository.remove(document);
  }
} 
