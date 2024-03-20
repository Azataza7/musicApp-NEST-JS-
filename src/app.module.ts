import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsController } from './albums/albums.controller';

@Module({
  imports: [],
  controllers: [AppController, AlbumsController],
  providers: [AppService],
})
export class AppModule {}
