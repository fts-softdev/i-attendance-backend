
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsPhoneNumber } from 'class-validator';

import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: mongoose.Schema.Types.String })
    hoten: number;

    @Prop({ type: mongoose.Schema.Types.String })
    soDienThoai: string;

    @Prop({ type: mongoose.Schema.Types.String })
    email: string;

    @Prop({ type: mongoose.Schema.Types.String })
    avatar: string;

    @Prop({ type: mongoose.Schema.Types.Number })
    role: string;

    @Prop({ type: mongoose.Schema.Types.Number })
    viTien: string;

    @Prop({ type: mongoose.Schema.Types.String })
    password: string;

    @Prop({ type: mongoose.Schema.Types.String })
    access_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);