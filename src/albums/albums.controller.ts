import { Controller, Get } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Albums, AlbumsDocument } from "../schemas/albums.schema";
import { Model } from "mongoose";

@Controller("albums")
export class AlbumsController {
  constructor(
    @InjectModel(Albums.name)
    private albumsModel: Model<AlbumsDocument>
  ) {}

  @Get()
  getAll() {
    return this.albumsModel.find();
  }

}