import { Injectable } from '@nestjs/common';
import { Subscriber } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriberDto } from './subscribers.dto';

@Injectable()
export class SubscribersService {
    constructor (private readonly prisma: PrismaService) {}

    async createSubscriber(data: CreateSubscriberDto): Promise<Subscriber> {
        return this.prisma.subscriber.create({ data });
      }
    
      // Метод для получения информации об абонентах
      async getSubscriberInfo(): Promise<Subscriber[]> {
        return this.prisma.subscriber.findMany();
      }
    
      // Метод для обновления информации об абоненте
      async updateSubscriber(id: number, data: Partial<CreateSubscriberDto>): Promise<Subscriber> {
        return this.prisma.subscriber.update({ where: { id }, data });
      }
}
