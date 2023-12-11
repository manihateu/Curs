import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(name: string, theme: string, inventoryNumber: string, cellCode: string, quantity: number, entryDate: Date): Promise<Document> {
    const documentRecord = this.documentRepository.create({ name, theme, inventoryNumber, cellCode, quantity, entryDate });
    return this.documentRepository.save(documentRecord);
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
