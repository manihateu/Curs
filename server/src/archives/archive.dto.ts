export class CreateArchiveDto {
        shelf: number;
        rack: number;
        cell: number;
        cellCode?: string;
        filling: boolean;
        createdAt: Date;
}