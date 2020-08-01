import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public articles = [
    {
      _id: '1',
      title: 'article 1',
    },
    {
      _id: '2',
      title: 'article 2',
    },
    {
      _id: '3',
      title: 'article 3',
    },
    {
      _id: '4',
      title: 'article 4',
    },
  ];

  getArticles() {
    return this.articles;
  }

  getArticleById(_id: string) {
    return this.articles.find(article => article._id == _id);
  }
}
