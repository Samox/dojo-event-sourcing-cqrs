import { Injectable } from '@nestjs/common';
import { ArticleDTO } from './article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  root(): string {
    return 'Hello World!';
  }

  async storeArticle(articleDto: ArticleDTO): Promise<Article> {
    const article = await this.articleRepository.create(articleDto);
    await this.articleRepository.save(article);
    return article;
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticle(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }
}
