import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEvents } from './events/namespace';

const recreateEvent = (event: Event) => {
  const payload = event.payload;
  try {
    const articleEvent = new (ArticleEvents as any)[event.className](payload);
    return articleEvent;
  } catch (error) {
    throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
  }
};

@Injectable()
export class ArticleRepository {
  constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}

  async findById(aggregateId: Article['id']) {
    const articleHistory: Event[] = await this.eventRepository.find({ where: { aggregateId } });
    const articleHistoryEvents = articleHistory.map(recreateEvent);
    const article = new Article();
    article.loadFromHistory(articleHistoryEvents);
    return article;
  }
}
