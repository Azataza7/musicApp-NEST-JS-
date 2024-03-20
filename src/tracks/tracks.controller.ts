import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tracks, TracksDocument } from "../schemas/tracks.schema";
import { CreateTrackDto } from "./create-track.dto";

@Controller("tracks")
export class TracksController {
  constructor(
    @InjectModel(Tracks.name)
    private tracksModel: Model<TracksDocument>
  ) {
  }

  @Get()
  async getAll(@Query("searchByAlbum") searchByAlbum: string) {
    try {
      if (searchByAlbum) {
        return this.tracksModel.find({album: searchByAlbum})
          .sort({trackNumber: 1})
          .populate({
            path: 'album', select: '_id name date_release image',
            populate: {
              path: 'artist',
              select: '_id name image'
            }
          });

      } else {
        return this.tracksModel.find()
          .populate("artist")
          .populate("album");
      }
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async createTrack(
    @Body() trackData: CreateTrackDto
  ) {
    const trackCount = await this.tracksModel.countDocuments({ album: trackData.album });

    try {
      const track = new this.tracksModel({
        name: trackData.name,
        artist: trackData.artist,
        album: trackData.album,
        durationTime: trackData.durationTime,
        trackNumber: trackCount + 1
      });

      return track.save();

    } catch (e) {
      throw e;
    }
  }

  @Delete(":id")
  async deleteOneItem(@Param("id") id: string) {
    try {
      const track = await this.tracksModel.deleteOne({ _id: id });

      if (!track) {
        return { message: "Track not found or already deleted" };
      }

      return { message: "Track has been deleted" };
    } catch (e) {
      return { error: e };
    }
  }
}
