import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistsDocument = Artists & Document;

@Schema()
export class Artists {
  @Prop({ required: true })
  name: string;

  @Prop()
  information: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const ArtistsSchema = SchemaFactory.createForClass(Artists);
