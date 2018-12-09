import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  execute() {}
}
