import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import { createSubscriberDto } from './subscriber.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
    private readonly tokenService: TokenService
  ) {}

  async createSubscriber({name, department, phone, receivedDate}: createSubscriberDto): Promise<createSubscriberDto> {
    const subscriberRecord = this.subscriberRepository.create({ name, department, phone, receivedDate });
    return this.subscriberRepository.save(subscriberRecord);
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return this.subscriberRepository.find();
  }

  async getSubscriberById(id: number): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.findOne({ where: { id: id } });
    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }
    return subscriber;
  }
  
  async updateSubscriber(id: number, updateData: Partial<Subscriber>, token: string): Promise<Subscriber> {
    const existUser = await this.tokenService.getUserFromToken(token)
    if (existUser.role !== "АДМИН") throw new HttpException("У вас недостаточно прав", 403)
    const subscriber = await this.getSubscriberById(id);
    this.subscriberRepository.merge(subscriber, updateData);
    return this.subscriberRepository.save(subscriber);
  }

  async deleteSubscriber(id: number, token: string): Promise<void> {
    const existUser = await this.tokenService.getUserFromToken(token)
    if (existUser.role !== "АДМИН") throw new HttpException("У вас недостаточно прав", 403)
    const subscriber = await this.getSubscriberById(id);
    await this.subscriberRepository.remove(subscriber);
  }
} 
