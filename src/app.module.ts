import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ModuleRef } from '@nestjs/core';
import { EventSaga } from './article.saga';
import { ArticleRepository } from './article.repository';
import { Event } from './event.entity';
import { Catalog } from './catalog.entity';
import { AddIdToCatalogHandler } from './commands/handlers/add-id-to-catalog.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sammyt',
      password: '',
      database: 'croute',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article, Event, Catalog]),
    CQRSModule,
  ],
  controllers: [AppController],
  providers: [
    ArticleRepository,
    AppService,
    CreateArticleHandler,
    AddIdToCatalogHandler,
    EventSaga,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly moduleRef: ModuleRef,
    private readonly eventBus$: EventBus,
    private readonly eventSaga: EventSaga,
  ) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register([CreateArticleHandler, AddIdToCatalogHandler]);
    this.eventBus$.setModuleRef(this.moduleRef);
    this.eventBus$.combineSagas([this.eventSaga.eventPublished, this.eventSaga.entityCreated]);
  }
}
