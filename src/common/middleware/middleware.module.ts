import { Module } from "@nestjs/common";
import { Logger } from "../logger";
import { ConsoleLogger } from "../logger/console-logger";
import { LoggerModule } from "../logger/logger.module";
import { LoggerMiddleware } from "./logger.middleware";

@Module({
    imports: [
        LoggerModule,
    ],
    providers: [
        LoggerMiddleware
    ]
})
export class MiddlewareModule { }