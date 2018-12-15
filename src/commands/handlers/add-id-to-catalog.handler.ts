import { AddIdToCatalogCommand } from '../implementations/add-id-to-catalog.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from 'src/catalog.entity';
import { Repository } from 'typeorm';

@CommandHandler(AddIdToCatalogCommand)
export class AddIdToCatalogHandler implements ICommandHandler<AddIdToCatalogCommand> {
  constructor(@InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>) {}
  async execute(command: AddIdToCatalogCommand) {
    const catalog: Catalog = (await this.catalogRepository.findOne(command.entityName)) || {
      entityName: command.entityName,
      idList: [],
    };
    catalog.idList.push(command.id);
    this.catalogRepository.save(catalog);
  }
}
