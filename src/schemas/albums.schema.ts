import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type AlbumsDocument = Albums & Document

@Schema()
export class Albums {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId, ref: 'Artists', required: true
  })
  artist: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  date_release: Number;

  @Prop()
  image: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const ALbumsSchema = SchemaFactory.createForClass(Albums);