import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchiveService } from './archive/archive.service';
import { SubscriberService } from './subscriber/subscriber.service';
import { DocumentService } from './document/document.service';
import { ArchiveController } from './archive/archive.controller';
import { DocumentController } from './document/document.controller';
import { SubscriberController } from './subscriber/subscriber.controller';
import { ArchiveModule } from './archive.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArchiveModule,
  ],
  controllers: [AppController, ArchiveController, DocumentController, SubscriberController],
  providers: [AppService, ArchiveService, SubscriberService, DocumentService],
})
export class AppModule {}
