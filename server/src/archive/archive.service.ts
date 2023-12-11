import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archive } from '../entities/archive.entity';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private archiveRepository: Repository<Archive>,
  ) {}

  async createArchiveRecord({shelf, shelfNumber, cell, cellCode, filling}): Promise<Archive> {
    const archiveRecord = this.archiveRepository.create({ shelf, shelfNumber, cell, cellCode, filling });
    return this.archiveRepository.save(archiveRecord);
  }

  async getAllArchiveRecords(): Promise<Archive[]> {
    return this.archiveRepository.find();
  }

  async getArchiveRecordByCellCode(cellCode: string): Promise<Archive> {
    const archiveRecord = await this.archiveRepository.findOne({ where: { cellCode } });
    if (!archiveRecord) {
      throw new NotFoundException(`Archive record with cell code ${cellCode} not found`);
    }
    return archiveRecord;
  }

  async updateArchiveRecord(cellCode: string, updateData: Partial<Archive>): Promise<Archive> {
    const archiveRecord = await this.getArchiveRecordByCellCode(cellCode);
    this.archiveRepository.merge(archiveRecord, updateData);
    return this.archiveRepository.save(archiveRecord);
  }

  async deleteArchiveRecord(cellCode: string): Promise<void> {
    const archiveRecord = await this.getArchiveRecordByCellCode(cellCode);
    await this.archiveRepository.remove(archiveRecord);
  }
}