import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchiveService } from './archive/archive.service';
import { SubscriberService } from './subscriber/subscriber.service';
import { DocumentService } from './document/document.service';
import { ArchiveController } from './archive/archive.controller';
import { DocumentController } from './document/document.controller';
import { SubscriberController } from './subscriber/subscriber.controller';
import { ArchiveModule } from './archive/archive.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from './document/document.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { Archive } from './entities/archive.entity';
import { Document } from './entities/document.entity';
import { Subscriber } from './entities/subscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://default:MeYBXNSn3Z6u@ep-autumn-truth-18448792-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb",
      entities: [Archive, Document, Subscriber],
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
    }),
    ArchiveModule,
    DocumentModule,
    SubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
