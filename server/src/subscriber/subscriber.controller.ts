import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { createSubscriberDto } from './subscriber.dto';

@Controller('subscriber')
export class SubscriberController {
    constructor (private readonly sibscriberService: SubscriberService) {}

    @Post('/create')
    async createSubscriber(@Body() dto: createSubscriberDto) {
        return await this.sibscriberService.createSubscriber(dto)
    }

    @Get()
    async getAll() {
        return await this.sibscriberService.getAllSubscribers()
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return await this.sibscriberService.getSubscriberById(id)
    }

    @Post('/update/:id')
    async update(@Param('id') id: number, @Body() data: Partial<createSubscriberDto>) {
        return await this.sibscriberService.updateSubscriber(id, data)
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return await this.sibscriberService.deleteSubscriber(id)
    }
}
