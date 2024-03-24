import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TracksDocument = Tracks & Document;

@Schema()
export class Tracks {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Artists',
    required: true,
  })
  artist: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Albums',
    required: true,
  })
  album: MongooseSchema.Types.ObjectId;

  @Prop()
  durationTime: string;

  @Prop({ required: true })
  trackNumber: number;

  @Prop({ default: false })
  isPublished: boolean;
}

export const TracksSchema = SchemaFactory.createForClass(Tracks);
