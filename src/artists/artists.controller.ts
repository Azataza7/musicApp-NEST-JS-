import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artists, ArtistsDocument } from '../schemas/artists.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtistDto } from './create-artist.dto';
import { TokenAuthGuard } from 'src/token-auth/token-auth.guard';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artists.name)
    private artistsModel: Model<ArtistsDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.artistsModel.find();
  }

  @Get(':id')
  async getOneItem(@Param('id') id: string) {
    try {
      const artist = await this.artistsModel.findById(id);

      if (!artist) {
        return { message: 'Artist not found' };
      }

      return artist;
    } catch (e) {
      return { error: e };
    }
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/artists' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistData: CreateArtistDto,
  ) {
    try {
      const artist = new this.artistsModel({
        name: artistData.name,
        information: artistData.information ? artistData.information : null,
        image: file ? '/uploads/artists/' + file.filename : null,
      });

      return artist.save();
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  async deleteOneItem(@Param('id') id: string) {
    try {
      const artist = await this.artistsModel.deleteOne({ _id: id });

      if (!artist) {
        return { message: 'Artist not found or already deleted' };
      }

      return { message: 'Artist has been deleted' };
    } catch (e) {
      return { error: e };
    }
  }
}
