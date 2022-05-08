import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ConsoleLogger } from '../logger/console-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private passUrl: string[] = ['/health', '/graphql'];
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  // https://github.com/nestjs/graphql/issues/923

  constructor(
    private readonly logger: ConsoleLogger
  ) {}

  public use(req: Request, res: Response, next: () => void): void {
    // this.logger.log("hello ")
    return next();
  }
}
