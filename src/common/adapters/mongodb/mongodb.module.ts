import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";

import { Module } from "@nestjs/common";

const parsed = config().parsed;
const DB_URL = parsed.DATABASE_MONGODB_URL;

@Module({
    imports: [
        MongooseModule.forRoot(DB_URL)
    ]
})

export class MongodbModule { }