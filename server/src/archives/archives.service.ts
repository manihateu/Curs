import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Archive } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArchiveDto } from './archive.dto';
import { cells, racks } from 'src/constants';

@Injectable()
export class ArchivesService {
    constructor (private readonly prismaService: PrismaService) {}
    private shuffle(o){ 
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    
    async createArchiveRecord(data: CreateArchiveDto): Promise<Archive> {
        if (data.cell > cells) {
            throw new HttpException("Такой ячейки нет", 404)
        }
        if (data.rack > racks) {
            throw new HttpException("Такой полки нет", 404)
        }
        if (data.shelf > racks) {
            throw new HttpException("Такого стеллажа нет", 404)
        }
        const existCell = await this.prismaService.archive.findFirst({where: {
            cell: data.cell,
        }})
        if (existCell) {
            throw new HttpException('Ячейка занята', HttpStatus.CONFLICT)
        }
        return await this.prismaService.archive.create({ data: {
            ...data,
            cellCode: this.shuffle(data.cell)
        } });
      }
    
      // Метод для получения всех архивов
      async getArchives(): Promise<Archive[]> {
        return await this.prismaService.archive.findMany()
      }
    
      // Метод для обновления записи об архиве
      async updateArchiveRecord(id: number, data: Partial<CreateArchiveDto>): Promise<Archive> {
        return this.prismaService.archive.update({ where: { id }, data  });
      }
    
      // Метод для получения документов в архиве
      async getDocumentsInArchive(id: number): Promise<any> {
        const existArchive = this.prismaService.archive.findFirst({
            where: {
                id
            }
        })
        if (existArchive.documents.length != 0) {
            return existArchive.documents
        }
         throw new HttpException("документов в архиве нет", 404)
      }
}
