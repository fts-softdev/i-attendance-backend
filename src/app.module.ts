import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdapterModule } from './common/adapters/adapter.module';
import { AuthModule } from './routes/auth/auth.module';
import { FileUploadModule } from './routes/files/file.module';
import { ExportsModule } from './routes/exports/exports.module';
import { RecipientModule } from './routes/sendmail/recipient/recipient.module';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { MiddlewareModule } from './common/middleware/middleware.module';
import { LoggerModule } from './common/logger/logger.module';

import { LoggerMiddleware } from './common';
import { UserModule } from './shared/user';

@Module({
  imports: [
    // logger module
    LoggerModule,

    // schemas
    AuthModule,
    UserModule,

    // file module
    FileUploadModule,
    ExportsModule,

    // send mailer
    RecipientModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // adapter module 
    AdapterModule,

    // middle ware module
    MiddlewareModule,
  ],
  controllers: [AppController],
  providers: [
    AppGateway,
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // logger
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET }
      )
  }
}
