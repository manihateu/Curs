import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archive } from '../entities/archive.entity';
import { Document } from 'src/entities/document.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private archiveRepository: Repository<Archive>,
    private readonly tokenService: TokenService
  ) {}

  async createArchiveRecord({shelf, shelfNumber, cell, cellCode, filling}): Promise<Archive> {
    const archiveRecord = this.archiveRepository.create({ shelf, shelfNumber, cell, cellCode, filling });
    return this.archiveRepository.save(archiveRecord);
  }

  async getAllArchiveRecords(): Promise<Archive[]> {

    return await this.archiveRepository.find();
  }

  async getArchiveRecordByCellCode(cellCode: string): Promise<Archive> {
    const archiveRecord = await this.archiveRepository.findOne({ where: { cellCode } });
    if (!archiveRecord) {
      throw new NotFoundException(`Archive record with cell code ${cellCode} not found`);
    }
    return archiveRecord;
  }

  async updateArchiveRecord(cellCode: string, updateData: Partial<Archive>, token: string): Promise<Archive> {
    const existUser = await this.tokenService.getUserFromToken(token)
    if (existUser.role == 'СОТРУДНИК') throw new HttpException('у вас нет прав', 403)
    const archiveRecord = await this.getArchiveRecordByCellCode(cellCode);
    this.archiveRepository.merge(archiveRecord, updateData);
    return this.archiveRepository.save(archiveRecord);
  }

  async deleteArchiveRecord(cellCode: string, token: string): Promise<void> {
    const existUser = await this.tokenService.getUserFromToken(token)
    if (existUser.role == 'СОТРУДНИК') throw new HttpException('у вас нет прав', 403)
    const archiveRecord = await this.getArchiveRecordByCellCode(cellCode);
    await this.archiveRepository.remove(archiveRecord);
  }
}