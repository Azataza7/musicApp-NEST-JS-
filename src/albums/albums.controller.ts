import { Controller, Get } from "@nestjs/common";

@Controller('albums')
export class AlbumsController {
  @Get()
  getAll() {
    return 'All albums here'
  }

}