import {
  Resolver,
  Query,
  Mutation,
  Context,
  ObjectType,
  Field,
  Args,
} from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@ObjectType()
class Article {
  @Field()
  _id: string;

  @Field()
  title: string;
}

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query(() => [Article])
  articles(): Article[] {
    return this.appService.getArticles();
  }

  @Query(() => Article)
  article(@Args('_id') _id: string): Article {
    return this.appService.getArticleById(_id);
  }

  @Query(() => String, { nullable: true })
  me(@Context('req') req: Request): string {
    let token = req.cookies?.token;
    if (!token) return token;
    return 'John Doe';
  }

  @Mutation(() => String)
  login(@Context('res') res: Response): string {
    res.cookie('token', 'mytoken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    return 'you have been logged in';
  }

  @Mutation(() => Boolean)
  logout(@Context('res') res: Response): boolean {
    res.clearCookie('token');
    return true;
  }
}
