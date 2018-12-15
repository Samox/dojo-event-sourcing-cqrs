import { ICommand } from '@nestjs/cqrs';

export class AddIdToCatalogCommand implements ICommand {
  constructor(public readonly entityName: string, public readonly id: string) {}
}
