import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsController } from './albums/albums.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Albums, ALbumsSchema } from './schemas/albums.schema';
import { ArtistsController } from './artists/artists.controller';
import { Artists, ArtistsSchema } from './schemas/artists.schema';
import { TracksController } from './tracks/tracks.controller';
import { Tracks, TracksSchema } from './schemas/tracks.schema';
import { User, UserSchema } from './schemas/users.schema';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musical'),
    MongooseModule.forFeature([
      { name: Albums.name, schema: ALbumsSchema },
      { name: Artists.name, schema: ArtistsSchema },
      { name: Tracks.name, schema: TracksSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
  ],
  controllers: [
    AppController,
    AlbumsController,
    ArtistsController,
    TracksController,
    UsersController,
  ],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule {}
