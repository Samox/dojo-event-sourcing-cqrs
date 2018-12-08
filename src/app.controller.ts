import { Get, Controller } from '@nestjs/common';
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
}
