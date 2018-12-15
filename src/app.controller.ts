import { Get, Controller, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDTO } from './article.dto';
import { Article } from './article.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/articles')
  getArticles(): Promise<Article[]> {
    return this.appService.getAllArticles();
  }

  @Get('/articles/:id')
  getArticle(@Param() params): Promise<Article> {
    return this.appService.getArticle(params.id);
  }

  @Post('/articles')
  async createArticle(@Body() createArticleDto: ArticleDTO): Promise<ArticleDTO> {
    return this.appService.storeArticle(createArticleDto);
  }
}
