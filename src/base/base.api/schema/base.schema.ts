import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema()
export class Base {}

export const BaseSchema = SchemaFactory.createForClass(Base);