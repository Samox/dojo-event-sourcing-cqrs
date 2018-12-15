import { EventObservable, ICommand } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticleCreated } from './events/article-created.event';
import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { getRepository } from 'typeorm';
import { AddIdToCatalogCommand } from './commands/implementations/add-id-to-catalog.command';

@Injectable()
export class EventSaga {
  eventPublished = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$.ofType(ArticleCreated).pipe(
      map(event => {
        const storedEvent = new Event();
        storedEvent.payload = event;
        storedEvent.aggregateId = event.aggregateId;
        const { constructor } = Object.getPrototypeOf(event);
        storedEvent.className = constructor.name;
        getRepository(Event).save(storedEvent);
        return null;
      }),
    );
  }

  entityCreated = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$.ofType(ArticleCreated).pipe(
      map(event => {
        return new AddIdToCatalogCommand('article', event.aggregateId);
      }),
    );
  }
}
