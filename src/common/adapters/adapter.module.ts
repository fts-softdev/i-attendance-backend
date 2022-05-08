import { Module } from "@nestjs/common";
import { MongodbModule } from "./mongodb/mongodb.module";
import { RedisModule } from "./redis/redis.module";
// import { OrmConnectModule } from "./typeorm/ormconnect.module";

@Module({
    imports: [
        // OrmConnectModule,
        RedisModule,
        MongodbModule
    ],
})

export class AdapterModule { }