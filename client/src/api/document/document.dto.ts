import { CreateArchiveDto } from "../archive/archive.dto";
import { createSubscriberDto } from "../subscribers/subscriber.dto";

export interface CreateDocumentDto {
    id?: number;
    name: string;
    theme: string;
    inventoryNumber: string;
    cellCode: string;
    quantity: number;
    entryDate: Date;
    archive: CreateArchiveDto;
    subscriber: createSubscriberDto;
}