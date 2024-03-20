import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsController } from './albums/albums.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Albums, ALbumsSchema } from "./schemas/albums.schema";
import { ArtistsController } from './artists/artists.controller';
import { Artists, ArtistsSchema } from "./schemas/artists.schema";
import { TracksController } from './tracks/tracks.controller';
import { Tracks, TracksSchema } from "./schemas/tracks.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musical'),
    MongooseModule.forFeature([
      { name: Albums.name, schema: ALbumsSchema},
      { name: Artists.name, schema: ArtistsSchema},
      { name: Tracks.name, schema: TracksSchema},
    ])
  ],
  controllers: [AppController, AlbumsController, ArtistsController, TracksController],
  providers: [AppService],
})
export class AppModule {}
