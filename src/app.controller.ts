import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDTO } from './article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/articles')
  getArticle(): ArticleDTO {
    return { name: 'Mon premier article', content: 'Croute' };
  }

  @Post('/articles')
  async createArticle(
    @Body() createArticleDto: ArticleDTO,
  ): Promise<ArticleDTO> {
    return this.appService.storeArticle(createArticleDto);
  }
}
