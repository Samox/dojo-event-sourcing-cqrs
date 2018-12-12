import { IEvent } from '@nestjs/cqrs';

export class ArticleCreated implements IEvent {
  constructor(payload: { aggregateId: string; name: string; content: string }) {
    this.aggregateId = payload.aggregateId;
    this.name = payload.name;
    this.content = payload.content;
  }
  aggregateId: string;
  name: string;
  content: string;
}
