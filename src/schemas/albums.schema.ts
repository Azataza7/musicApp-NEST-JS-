import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AlbumsDocument = Albums & Document

@Schema()
export class Albums {
  @Prop({ required: true })
  name: string;

  @Prop()
  artist: string;

  @Prop({ required: true })
  date_release: Number;

  @Prop()
  image: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const ALbumsSchema = SchemaFactory.createForClass(Albums);