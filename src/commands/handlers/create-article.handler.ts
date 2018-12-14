import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, createArticle } from '../../article.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  async execute(command: CreateArticleCommand, resolve: (value?) => void) {
    const article: Article = createArticle(command.articleDto);
    resolve(article);
  }
}
