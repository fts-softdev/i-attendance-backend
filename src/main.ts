import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { join } from 'path';
import { AppModule } from './app.module';

import { createServer } from 'http';
import { Server } from 'socket.io';
import * as express from 'express';

async function bootstrap() {
  const PORT = 5000;

  // express init
  const expressServer = express();
  expressServer.use('', express.static(join(__dirname, '..', 'static')));
  expressServer.use('', express.static(join(__dirname, '..', '')));

  // init app NestFactory
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));

  // intercept dapter
  app.useWebSocketAdapter(new WsAdapter(app));

  // enable cors
  app.enableCors();

  await app.init();

  new Server(createServer(await app.listen(PORT)));
}
bootstrap();
