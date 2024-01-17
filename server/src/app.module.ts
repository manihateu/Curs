import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './archives/archives.module';
import { DocumentsModule } from './documents/documents.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [ArchivesModule, DocumentsModule, SubscribersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
