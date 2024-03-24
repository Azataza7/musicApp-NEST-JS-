import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Albums, AlbumsDocument } from '../schemas/albums.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Albums.name)
    private albumsModel: Model<AlbumsDocument>,
  ) {}

  @Get()
  getAll(@Query('artistId') artistId: string) {
    try {
      if (artistId) {
        return this.albumsModel
          .find({ artist: artistId })
          .populate('artist', '_id name information image isPublished')
          .sort({ date_release: -1 });
      } else {
        return this.albumsModel
          .find()
          .populate('artist', '_id name information image isPublished');
      }
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async getOneItem(@Param('id') id: string) {
    try {
      const album = await this.albumsModel.findById(id);

      if (!album) {
        return { message: 'Album not found' };
      }

      return album;
    } catch (e) {
      if (e.name === 'CastError') {
        return { error: 'Invalid album id format' };
      }
      return { error: e };
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumData: CreateAlbumDto,
  ) {
    try {
      const artist = new this.albumsModel({
        name: albumData.name,
        artist: albumData.artist,
        date_release: albumData.date_release,
        image: file ? '/uploads/albums/' + file.filename : null,
      });

      return artist.save();
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  async deleteOneItem(@Param('id') id: string) {
    try {
      const album = await this.albumsModel.deleteOne({ _id: id });

      if (!album) {
        return { message: 'Album not found or already deleted' };
      }

      return { message: 'Album has been deleted' };
    } catch (e) {
      return { error: e };
    }
  }
}
