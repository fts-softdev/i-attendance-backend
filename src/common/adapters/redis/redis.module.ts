import { Module } from "@nestjs/common";
import { RedisIoAdapter } from "./RedisIoAdapter";

@Module({
    imports: [RedisIoAdapter]
})
export class RedisModule {} 